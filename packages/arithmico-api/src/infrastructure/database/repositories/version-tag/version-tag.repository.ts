import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
