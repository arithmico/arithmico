import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { createPagedAggregationPipeline } from '../../../../common/utils/paged-aggregation/paged-aggregation';
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
} from '../../schemas/feature-flag/feature-flag.schema';
import {
  VersionTag,
  VersionTagDocument,
} from '../../schemas/version-tag/version-tag.schema';

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
}
