import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { createPagedAggregationPipeline } from '../../../../common/utils/paged-aggregation/paged-aggregation';
import {
  BuildJob,
  BuildJobDocument,
} from '../../schemas/build-job/build-job.schema';
import {
  ConfigurationRevisionFeatureFlagAssociation,
  ConfigurationRevisionFeatureFlagAssociationDocument,
} from '../../schemas/configuration-revision-feature-flag-association/configuration-revision-feature-flag-association';
import {
  ConfigurationRevision,
  ConfigurationRevisionDocument,
} from '../../schemas/configuration-revision/configuration-revision.schema';
import {
  Configuration,
  ConfigurationDocument,
} from '../../schemas/configuration/configuration.schema';
import {
  FeatureFlag,
  FeatureFlagDocument,
  FeatureFlagType,
} from '../../schemas/feature-flag/feature-flag.schema';
import {
  VersionTag,
  VersionTagDocument,
} from '../../schemas/version-tag/version-tag.schema';
import { ConfigurationBuildJobsAndVersions } from './configuration.types';

interface ConfigurationFeaturesByType {
  types: string[];
  constants: string[];
  functions: string[];
  methods: string[];
  operators: string[];
}

@Injectable()
export class ConfigurationRepository {
  constructor(
    @InjectModel(Configuration.name)
    private readonly configurationModel: Model<ConfigurationDocument>,
    @InjectModel(ConfigurationRevision.name)
    private readonly revisionModel: Model<ConfigurationRevisionDocument>,
    @InjectModel(ConfigurationRevisionFeatureFlagAssociation.name)
    private readonly featureFlagAssociationModel: Model<ConfigurationRevisionFeatureFlagAssociationDocument>,
    @InjectModel(VersionTag.name)
    private readonly versionTagModel: Model<VersionTagDocument>,
    @InjectModel(FeatureFlag.name)
    private readonly featureFlagModel: Model<FeatureFlagDocument>,
    @InjectModel(BuildJob.name)
    private readonly buildJobModel: Model<BuildJobDocument>,
  ) {}

  async createConfiguration(
    name: string,
    autoBuild: boolean,
  ): Promise<ConfigurationDocument> {
    const configuration: Configuration = {
      name,
      autoBuild,
    };
    const document = await this.configurationModel.create(configuration);
    return document;
  }

  async createConfigurationRevision(
    configurationId: string,
    featureFlagIds: string[],
    minimumVersionTagId: string,
  ): Promise<ConfigurationRevisionDocument> {
    const versionTagDocument = await this.versionTagModel
      .findById(minimumVersionTagId)
      .exec();
    if (!versionTagDocument) {
      throw new NotFoundException();
    }

    const foundFeatureFlagCount = await this.featureFlagModel
      .find({
        _id: {
          $in: featureFlagIds,
        },
      })
      .countDocuments()
      .exec();

    const revision =
      (await this.revisionModel
        .find({
          configurationId,
        })
        .countDocuments()
        .exec()) + 1;

    if (foundFeatureFlagCount !== featureFlagIds.length) {
      throw new NotFoundException();
    }

    const configurationRevision: ConfigurationRevision = {
      configurationId,
      revision,
      minimumVersionTagId,
    };
    const revisionDocument = await this.revisionModel.create(
      configurationRevision,
    );
    await Promise.all(
      featureFlagIds.map((featureFlagId) =>
        this.associateFeatureFlagWithConfigurationRevision(
          revisionDocument._id,
          featureFlagId,
        ),
      ),
    );
    return revisionDocument;
  }

  private async associateFeatureFlagWithConfigurationRevision(
    configurationRevisionId: string,
    featureFlagId: string,
  ): Promise<ConfigurationRevisionFeatureFlagAssociationDocument> {
    const association: ConfigurationRevisionFeatureFlagAssociation = {
      configurationRevisionId,
      featureFlagId,
    };
    return this.featureFlagAssociationModel.create(association);
  }

  async getConfigurationById(
    configurationId: string,
  ): Promise<(ConfigurationDocument & { revisions: number }) | undefined> {
    return (
      await this.configurationModel
        .aggregate()
        .match({ _id: configurationId })
        .limit(1)
        .lookup({
          from: this.revisionModel.collection.name,
          localField: '_id',
          foreignField: 'configurationId',
          as: 'revisions',
        })
        .addFields({
          revisions: { $size: '$revisions' },
        })
        .exec()
    ).at(0);
  }

  async getConfigurationByIdOrThrow(
    configurationId: string,
  ): Promise<ConfigurationDocument & { revisions: number }> {
    const configurationDocument = await this.getConfigurationById(
      configurationId,
    );
    if (!configurationDocument) {
      throw new NotFoundException();
    }
    return configurationDocument;
  }

  async getConfigurationRevisions(
    configurationId: string,
    skip: number,
    limit: number,
  ): Promise<
    PagedResponse<
      ConfigurationRevisionDocument & {
        associatedFeatureFlags: number;
        minimumVersion: {
          major: number;
          minor: number;
          patch: number;
        };
      }
    >
  > {
    const aggregationResult = await this.revisionModel.aggregate(
      createPagedAggregationPipeline({
        skip,
        limit,
        preProcessingStages: [
          {
            $match: {
              configurationId,
            },
          },
          {
            $sort: {
              revision: -1,
            },
          },
        ],
        itemProcessingStages: [
          {
            $lookup: {
              from: this.featureFlagAssociationModel.collection.name,
              localField: '_id',
              foreignField: 'configurationRevisionId',
              as: 'associatedFeatureFlags',
            },
          },
          {
            $addFields: {
              associatedFeatureFlags: {
                $size: '$associatedFeatureFlags',
              },
            },
          },
          {
            $lookup: {
              from: this.versionTagModel.collection.name,
              localField: 'minimumVersionTagId',
              foreignField: '_id',
              as: 'minimumVersion',
            },
          },
          {
            $addFields: {
              minimumVersion: {
                $arrayElemAt: ['$minimumVersion', 0],
              },
            },
          },
          {
            $addFields: {
              minimumVersion: '$minimumVersion.version',
            },
          },
        ],
      }),
    );

    return {
      skip,
      limit,
      total: aggregationResult.at(0).total,
      items: aggregationResult.at(0).items,
    };
  }

  async getConfigurations(
    skip: number,
    limit: number,
  ): Promise<PagedResponse<ConfigurationDocument & { revisions: number }>> {
    const result = await this.configurationModel.aggregate(
      createPagedAggregationPipeline({
        skip,
        limit,
        preProcessingStages: [{ $sort: { name: 1 } }],
        itemProcessingStages: [
          {
            $lookup: {
              from: this.revisionModel.collection.name,
              localField: '_id',
              foreignField: 'configurationId',
              as: 'revisions',
            },
          },
          {
            $addFields: {
              revisions: { $size: '$revisions' },
            },
          },
        ],
      }),
    );
    return {
      skip,
      limit,
      total: result.at(0).total,
      items: result.at(0).items,
    };
  }

  async getRevisionByConfigurationIdAndRevisionId(
    configurationId: string,
    revisionId: string,
  ): Promise<ConfigurationRevisionDocument | null> {
    return this.revisionModel
      .findOne({
        _id: revisionId,
        configurationId,
      })
      .exec();
  }

  async getRevisionByConfigurationIdAndRevisionIdOrThrow(
    configurationId: string,
    revisionId: string,
  ): Promise<ConfigurationRevisionDocument> {
    const revisionDocument =
      await this.getRevisionByConfigurationIdAndRevisionId(
        configurationId,
        revisionId,
      );
    if (!revisionDocument) {
      throw new NotFoundException();
    }
    return revisionDocument;
  }

  async aggregateFeatureFlagsByType(
    configurationId: string,
    revisionId: string,
  ): Promise<ConfigurationFeaturesByType> {
    await this.getRevisionByConfigurationIdAndRevisionIdOrThrow(
      configurationId,
      revisionId,
    );
    const result: ConfigurationFeaturesByType = {
      types: [],
      methods: [],
      functions: [],
      constants: [],
      operators: [],
    };
    const cursor = this.featureFlagAssociationModel
      .aggregate()
      .match({ configurationRevisionId: revisionId })
      .lookup({
        from: this.featureFlagModel.collection.name,
        localField: 'featureFlagId',
        foreignField: '_id',
        as: 'featureFlag',
      })
      .addFields({
        featureFlag: {
          $arrayElemAt: ['$featureFlag', 0],
        },
      })
      .replaceRoot('$featureFlag')
      .cursor<FeatureFlagDocument>();

    for await (const doc of cursor) {
      switch (doc.type) {
        case FeatureFlagType.Type:
          result.types.push(doc.flag);
          break;

        case FeatureFlagType.Function:
          result.functions.push(doc.flag);
          break;

        case FeatureFlagType.Constant:
          result.constants.push(doc.flag);
          break;

        case FeatureFlagType.Method:
          result.methods.push(doc.flag);
          break;

        case FeatureFlagType.Operator:
          result.operators.push(doc.flag);
          break;
      }
    }

    return result;
  }

  async getLatestConfigurationRevisionFeatureFlags(
    configurationId: string,
  ): Promise<FeatureFlagDocument[]> {
    return this.revisionModel
      .aggregate()
      .match({ configurationId })
      .sort({ revision: -1 })
      .limit(1)
      .lookup({
        from: this.featureFlagAssociationModel.collection.name,
        localField: '_id',
        foreignField: 'configurationRevisionId',
        as: 'featureFlag',
      })
      .unwind('$featureFlag')
      .replaceRoot('$featureFlag')
      .lookup({
        from: this.featureFlagModel.collection.name,
        localField: 'featureFlagId',
        foreignField: '_id',
        as: 'featureFlag',
      })
      .unwind('$featureFlag')
      .replaceRoot('$featureFlag');
  }

  async getPublicConfigurations(
    skip: number,
    limit: number,
  ): Promise<PagedResponse<ConfigurationBuildJobsAndVersions>> {
    const result = await this.configurationModel.aggregate(
      createPagedAggregationPipeline({
        skip,
        limit,
        preProcessingStages: [
          {
            $sort: {
              name: -1,
            },
          },
          {
            $lookup: {
              from: this.buildJobModel.collection.name,
              localField: '_id',
              foreignField: 'configurationId',
              pipeline: [
                {
                  $match: {
                    isPublic: true,
                  },
                },
                {
                  $lookup: {
                    from: this.versionTagModel.collection.name,
                    localField: 'versionTagId',
                    foreignField: '_id',
                    as: 'versionTag',
                  },
                },
                {
                  $addFields: {
                    versionTag: {
                      $arrayElemAt: ['$versionTag', 0],
                    },
                  },
                },
                {
                  $lookup: {
                    from: this.revisionModel.collection.name,
                    localField: 'configurationRevisionId',
                    foreignField: '_id',
                    as: 'configurationRevision',
                  },
                },
                {
                  $addFields: {
                    configurationRevision: {
                      $arrayElemAt: ['$configurationRevision', 0],
                    },
                  },
                },
                {
                  $addFields: {
                    version: '$versionTag.version',
                    revision: '$configurationRevision.revision',
                  },
                },
                {
                  $unset: [
                    'versionTag',
                    'webhookToken',
                    'platforms.status',
                    'configurationRevision',
                  ],
                },
                {
                  $sort: {
                    revision: -1,
                    'version.major': -1,
                    'version.minor': -1,
                    'version.patch': -1,
                  },
                },
              ],
              as: 'buildJobs',
            },
          },
          {
            $addFields: {
              buildJobs: {
                $filter: {
                  input: '$buildJobs',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.isPublic', true],
                  },
                },
              },
            },
          },
          {
            $match: {
              $expr: {
                $gt: [
                  {
                    $size: '$buildJobs',
                  },
                  0,
                ],
              },
            },
          },
          {
            $addFields: {
              latestBuildJob: {
                $arrayElemAt: ['$buildJobs', 0],
              },
            },
          },
          {
            $unset: ['buildJobs'],
          },
        ],
      }),
    );

    return {
      skip,
      limit,
      total: result.at(0).total,
      items: result.at(0).items,
    };
  }
}
