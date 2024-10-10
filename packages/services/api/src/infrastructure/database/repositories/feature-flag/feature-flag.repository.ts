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
  FeatureFlag,
  FeatureFlagDocument,
  FeatureFlagType,
} from '../../schemas/feature-flag/feature-flag.schema';
import { SemanticVersion } from '../../schemas/sematic-version/semantic-version.schema';
import {
  VersionTag,
  VersionTagDocument,
} from '../../schemas/version-tag/version-tag.schema';

@Injectable()
export class FeatureFlagRepository {
  constructor(
    @InjectModel(FeatureFlag.name)
    private featureFlagModel: Model<FeatureFlagDocument>,
    @InjectModel(VersionTag.name)
    private versionTagModel: Model<VersionTagDocument>,
    @InjectModel(ConfigurationRevisionFeatureFlagAssociation.name)
    private configurationRevisionFeatureFlagAssociationModel: Model<ConfigurationRevisionFeatureFlagAssociationDocument>,
  ) {}

  async createFeatureFlag(
    type: FeatureFlagType,
    name: string,
    flag: string,
    enabledSinceVersionTagId: string,
  ): Promise<FeatureFlagDocument> {
    return this.featureFlagModel.create({
      type,
      name,
      flag,
      enabledSinceVersionTagId,
    });
  }

  async updateFeatureFlag(
    featureFlagId: string,
    name: string | undefined,
    disabledSinceVersionTagId: string | undefined,
  ): Promise<FeatureFlagDocument | null> {
    if (disabledSinceVersionTagId) {
      const versionTag = await this.versionTagModel.findById(
        disabledSinceVersionTagId,
      );
      if (!versionTag) {
        throw new NotFoundException();
      }
    }
    return this.featureFlagModel
      .findOneAndUpdate(
        {
          _id: featureFlagId,
        },
        {
          name,
          disabledSinceVersionTagId,
        },
        { new: true },
      )
      .exec();
  }

  async updateFeatureFlagOrThrow(
    featureFlagId: string,
    name: string | undefined,
    disabledSinceVersionTagId: string | undefined,
  ): Promise<FeatureFlagDocument> {
    const featureFlagDocument = await this.updateFeatureFlag(
      featureFlagId,
      name,
      disabledSinceVersionTagId,
    );
    if (!featureFlagDocument) {
      throw new NotFoundException();
    }
    return featureFlagDocument;
  }

  async getFeatureFlags(
    skip: number,
    limit: number,
  ): Promise<
    PagedResponse<
      FeatureFlagDocument & {
        enabledSinceVersion: SemanticVersion;
        disabledSinceVersion?: SemanticVersion;
      }
    >
  > {
    const result = await this.featureFlagModel.aggregate(
      createPagedAggregationPipeline({
        skip,
        limit,
        preProcessingStages: [
          {
            $sort: {
              name: 1,
            },
          },
        ],
        itemProcessingStages: [
          {
            $lookup: {
              from: this.versionTagModel.collection.name,
              localField: 'enabledSinceVersionTagId',
              foreignField: '_id',
              as: 'enabledSinceVersionTag',
            },
          },
          {
            $lookup: {
              from: this.versionTagModel.collection.name,
              localField: 'disabledSinceVersionTagId',
              foreignField: '_id',
              as: 'disabledSinceVersionTag',
            },
          },
          {
            $addFields: {
              enabledSinceVersion: {
                $arrayElemAt: ['$enabledSinceVersionTag', 0],
              },
              disabledSinceVersion: {
                $arrayElemAt: ['$disabledSinceVersionTag', 0],
              },
            },
          },
          {
            $addFields: {
              enabledSinceVersion: '$enabledSinceVersion.version',
              disabledSinceVersion: '$disabledSinceVersion.version',
            },
          },
        ],
      }),
    );

    return {
      skip: skip,
      limit: skip,
      total: result.at(0).total,
      items: result.at(0).items,
    };
  }

  async getFeatureFlagById(flagId: string): Promise<
    | (FeatureFlagDocument & {
        enabledSinceVersion: SemanticVersion;
        disabledSinceVersion?: SemanticVersion;
      })
    | null
  > {
    const result = await this.featureFlagModel
      .aggregate()
      .match({ _id: flagId })
      .lookup({
        from: this.versionTagModel.collection.name,
        localField: 'enabledSinceVersionTagId',
        foreignField: '_id',
        as: 'enabledSinceVersion',
      })
      .lookup({
        from: this.versionTagModel.collection.name,
        localField: 'disabledSinceVersionTagId',
        foreignField: '_id',
        as: 'disabledSinceVersion',
      })
      .addFields({
        enabledSinceVersion: {
          $arrayElemAt: ['$enabledSinceVersion', 0],
        },
        disabledSinceVersion: {
          $arrayElemAt: ['$disabledSinceVersion', 0],
        },
      })
      .addFields({
        enabledSinceVersion: '$enabledSinceVersion.version',
        disabledSinceVersion: '$disabledSinceVersion.version',
      })
      .exec();

    return result.at(0);
  }

  async getFeatureFlagByIdOrThrow(flagId: string): Promise<
    FeatureFlagDocument & {
      enabledSinceVersion: SemanticVersion;
      disabledSinceVersion?: SemanticVersion;
    }
  > {
    const featureFlagDocument = await this.getFeatureFlagById(flagId);
    if (!featureFlagDocument) {
      throw new NotFoundException();
    }
    return featureFlagDocument;
  }

  async getFeatureFlagByFlagAndType(
    flag: string,
    type: FeatureFlagType,
  ): Promise<FeatureFlagDocument | null> {
    return this.featureFlagModel
      .findOne({
        type,
        flag,
      })
      .exec();
  }

  async getFeatureFlagsForConfigurationRevision(
    revisionId: string,
    skip: number,
    limit: number,
  ): Promise<PagedResponse<FeatureFlagDocument>> {
    const result = await this.configurationRevisionFeatureFlagAssociationModel
      .aggregate(
        createPagedAggregationPipeline({
          skip,
          limit,
          preProcessingStages: [
            {
              $match: {
                configurationRevisionId: revisionId,
              },
            },
          ],
          itemProcessingStages: [
            {
              $lookup: {
                from: this.featureFlagModel.collection.name,
                localField: 'featureFlagId',
                foreignField: '_id',
                as: 'featureFlag',
              },
            },
            {
              $addFields: {
                featureFlag: {
                  $arrayElemAt: ['$featureFlag', 0],
                },
              },
            },
            {
              $replaceRoot: {
                newRoot: '$featureFlag',
              },
            },
            {
              $sort: {
                name: 1,
              },
            },
          ],
        }),
      )
      .exec();

    return {
      skip,
      limit,
      total: result.at(0).total,
      items: result.at(0).items,
    };
  }
}
