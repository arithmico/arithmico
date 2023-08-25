import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { createPagedAggregationPipeline } from '../../../../common/utils/paged-aggregation/paged-aggregation';
import { SemanticVersion } from '../../schemas/sematic-version/semantic-version.schema';
import {
  VersionTag,
  VersionTagDocument,
} from '../../schemas/version-tag/version-tag.schema';

@Injectable()
export class VersionTagRepository {
  constructor(
    @InjectModel(VersionTag.name)
    private versionTagModel: Model<VersionTagDocument>,
  ) {}

  async createVersionTag(tag: VersionTag): Promise<VersionTagDocument> {
    return this.versionTagModel.create(tag);
  }

  async versionTagExists(commit: string): Promise<boolean> {
    return !!(
      await this.versionTagModel.exists({
        commit,
      })
    )?._id;
  }

  async getVersionTags(
    skip: number,
    limit: number,
  ): Promise<PagedResponse<VersionTagDocument>> {
    const result = await this.versionTagModel
      .aggregate()
      .sort({
        'version.major': -1,
        'version.minor': -1,
        'version.patch': -1,
      })
      .facet({
        items: [{ $skip: skip }, { $limit: limit }],
        total: [{ $count: 'count' }],
      })
      .project({
        items: 1,
        total: { $arrayElemAt: ['$total.count', 0] },
      })
      .exec();

    return {
      items: result.at(0).items,
      total: result.at(0).total,
      skip,
      limit,
    };
  }

  async getVersionTagsGreaterThanOrEquals(
    version: SemanticVersion,
    skip: number,
    limit: number,
  ): Promise<PagedResponse<VersionTagDocument>> {
    const result = await this.versionTagModel.aggregate(
      createPagedAggregationPipeline({
        skip,
        limit,
        preProcessingStages: [
          {
            $match: {
              $or: [
                {
                  'version.major': {
                    $gt: version.major,
                  },
                },
                {
                  'version.major': {
                    $gte: version.major,
                  },
                  'version.minor': {
                    $gt: version.minor,
                  },
                },
                {
                  'version.major': {
                    $gte: version.major,
                  },
                  'version.minor': {
                    $gte: version.minor,
                  },
                  'version.patch': {
                    $gte: version.patch,
                  },
                },
              ],
            },
          },
          {
            $sort: {
              'version.major': -1,
              'version.minor': -1,
              'version.patch': -1,
            },
          },
        ],
      }),
    );

    return {
      items: result.at(0).items,
      total: result.at(0).total,
      skip,
      limit,
    };
  }

  async getLatestVersionTag(): Promise<VersionTagDocument | null> {
    return (
      await this.versionTagModel
        .find()
        .sort({
          'version.major': -1,
          'version.minor': -1,
          'version.patch': -1,
        })
        .limit(1)
        .exec()
    ).at(0);
  }

  async getLatestVersionTagOrThrow(): Promise<VersionTagDocument> {
    const versionTagDocument = await this.getLatestVersionTag();
    if (!versionTagDocument) {
      throw new NotFoundException();
    }
    return versionTagDocument;
  }

  async getVersionTagById(tagId: string): Promise<VersionTagDocument | null> {
    return this.versionTagModel.findById(tagId).exec();
  }

  async getVersionTagByIdOrThrow(tagId: string): Promise<VersionTagDocument> {
    const versionTagDocument = await this.getVersionTagById(tagId);
    if (!versionTagDocument) {
      throw new NotFoundException();
    }
    return versionTagDocument;
  }
}
