import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { createPagedAggregationPipeline } from '../../../../common/utils/paged-aggregation/paged-aggregation';
import {
  FeatureFlag,
  FeatureFlagDocument,
} from '../../schemas/feature-flag/feature-flag.schema';
import {
  VersionTag,
  VersionTagDocument,
} from '../../schemas/version-tag/version-tag.schema';
import { FeatureFlagRepository } from '../feature-flag/feature-flag.repository';
import { VersionTagRepository } from '../version-tag/version-tag.repository';

@Injectable()
export class FeatureFlagVersionTagRelationRepository {
  constructor(
    private featureFlagRepository: FeatureFlagRepository,
    private versionTagRepository: VersionTagRepository,
    @InjectModel(FeatureFlag.name)
    private featureFlagModel: Model<FeatureFlagDocument>,
    @InjectModel(VersionTag.name)
    private versionTagModel: Model<VersionTagDocument>,
  ) {}

  async getVersionTagsForFeatureFlag(
    flagId: string,
    skip: number,
    limit: number,
  ): Promise<PagedResponse<VersionTagDocument>> {
    const featureFlagDocument =
      await this.featureFlagRepository.getFeatureFlagByIdOrThrow(flagId);
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

  async getFeatureFlagsForVersionTag(
    tagId: string,
    skip: number,
    limit: number,
  ): Promise<PagedResponse<FeatureFlagDocument>> {
    const versionTagDocument =
      await this.versionTagRepository.getVersionTagByIdOrThrow(tagId);

    const result = await this.featureFlagModel.aggregate(
      createPagedAggregationPipeline({
        skip,
        limit,
        preProcessingStages: [
          {
            $lookup: {
              from: this.versionTagModel.collection.name,
              localField: 'enabledSinceVersionTagId',
              foreignField: '_id',
              as: 'enabledSinceVersionTag',
            },
          },
          {
            $addFields: {
              enabledSinceVersionTag: {
                $arrayElemAt: ['$enabledSinceVersionTag', 0],
              },
            },
          },
          {
            $match: {
              $or: [
                {
                  'enabledSinceVersionTag.version.major': {
                    $lt: versionTagDocument.version.major,
                  },
                },
                {
                  $and: [
                    {
                      'enabledSinceVersionTag.version.major': {
                        $lte: versionTagDocument.version.major,
                      },
                    },
                    {
                      'enabledSinceVersionTag.version.minor': {
                        $lt: versionTagDocument.version.minor,
                      },
                    },
                  ],
                },
                {
                  $and: [
                    {
                      'enabledSinceVersionTag.version.major': {
                        $lte: versionTagDocument.version.major,
                      },
                    },
                    {
                      'enabledSinceVersionTag.version.minor': {
                        $lte: versionTagDocument.version.minor,
                      },
                    },
                    {
                      'enabledSinceVersionTag.version.patch': {
                        $lte: versionTagDocument.version.patch,
                      },
                    },
                  ],
                },
              ],
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
              disabledSinceVersionTag: {
                $arrayElemAt: ['$disabledSinceVersionTag', 0],
              },
            },
          },
          {
            $match: {
              $or: [
                { disabledSinceVersionTag: { $eq: null } },
                {
                  'disabledSinceVersionTag.version.major': {
                    $lt: versionTagDocument.version.major,
                  },
                },
                {
                  $and: [
                    {
                      'disabledSinceVersionTag.version.major': {
                        $lte: versionTagDocument.version.major,
                      },
                    },
                    {
                      'disabledSinceVersionTag.version.minor': {
                        $lt: versionTagDocument.version.minor,
                      },
                    },
                  ],
                },
                {
                  $and: [
                    {
                      'disabledSinceVersionTag.version.major': {
                        $lte: versionTagDocument.version.major,
                      },
                    },
                    {
                      'disabledSinceVersionTag.version.minor': {
                        $lte: versionTagDocument.version.minor,
                      },
                    },
                    {
                      'disabledSinceVersionTag.version.patch': {
                        $lt: versionTagDocument.version.patch,
                      },
                    },
                  ],
                },
              ],
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
