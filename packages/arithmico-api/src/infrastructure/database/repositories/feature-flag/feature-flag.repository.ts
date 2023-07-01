import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { createPagedAggregationPipeline } from '../../../../common/utils/paged-aggregation/paged-aggregation';
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

  async getFeatureFlags(
    skip: number,
    limit: number,
  ): Promise<
    PagedResponse<
      Omit<
        FeatureFlagDocument,
        'enabledSinceVersionTagId' | 'disabledSinceVersionTagId'
      > & {
        enabledSinceVersionTag: SemanticVersion;
        disabledSinceVersionTag?: SemanticVersion;
      }
    >
  > {
    const result = await this.featureFlagModel.aggregate(
      createPagedAggregationPipeline({
        skip,
        limit,
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
              enabledSinceVersionTag: {
                $arrayElemAt: ['$enabledSinceVersionTag', 0],
              },
              disabledSinceVersionTag: {
                $arrayElemAt: ['$disabledSinceVersionTag', 0],
              },
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
}
