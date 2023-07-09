import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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

  async getVersionTagsForFeatureFlag(
    flagId: string,
    skip: number,
    limit: number,
  ): Promise<PagedResponse<VersionTagDocument>> {
    const featureFlagDocument = await this.getFeatureFlagByIdOrThrow(flagId);
    const enabledSinceVersion = featureFlagDocument.enabledSinceVersion;
    const disabledSinceVersion = featureFlagDocument.disabledSinceVersion;
    const minVersionFilter: FilterQuery<FeatureFlagDocument> = {
      $or: [
        { 'version.major': { $gt: enabledSinceVersion.major } },
        {
          $and: [
            { 'version.major': { $gte: enabledSinceVersion.major } },
            { 'version.minor': { $gt: enabledSinceVersion.minor } },
          ],
        },
        {
          $and: [
            { 'version.major': { $gte: enabledSinceVersion.major } },
            { 'version.minor': { $gte: enabledSinceVersion.minor } },
            { 'version.patch': { $gte: enabledSinceVersion.patch } },
          ],
        },
      ],
    };

    const filterQuery: FilterQuery<FeatureFlagDocument> = disabledSinceVersion
      ? {
          $and: [
            minVersionFilter,
            {
              $or: [
                { 'version.major': { $lt: disabledSinceVersion.major } },
                {
                  $and: [
                    { 'version.major': { $lte: disabledSinceVersion.major } },
                    { 'version.minor': { $lt: disabledSinceVersion.minor } },
                  ],
                },
                {
                  $and: [
                    { 'version.major': { $lte: disabledSinceVersion.major } },
                    { 'version.minor': { $lte: disabledSinceVersion.minor } },
                    { 'version.patch': { $lt: disabledSinceVersion.patch } },
                  ],
                },
              ],
            },
          ],
        }
      : minVersionFilter;

    const reuslt = await this.versionTagModel.aggregate(
      createPagedAggregationPipeline({
        skip,
        limit,
        preProcessingStages: [
          {
            $sort: {
              'version.major': -1,
              'version.minor': -1,
              'version.patch': -1,
            },
          },
          {
            $match: filterQuery,
          },
        ],
      }),
    );

    return {
      skip,
      limit,
      total: reuslt.at(0).total,
      items: reuslt.at(0).items,
    };
  }
}
