import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
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

  async createVersionTag(tag: VersionTag): Promise<void> {
    await this.versionTagModel.create(tag);
  }

  async versionTagExists(commit: string): Promise<boolean> {
    return !!(await this.versionTagModel.exists({
      commit,
    }));
  }

  async getVersionTags(
    skip: number,
    limit: number,
  ): Promise<PagedResponse<VersionTagDocument>> {
    const result = await this.versionTagModel
      .aggregate()
      .sort({ name: -1 })
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
}
