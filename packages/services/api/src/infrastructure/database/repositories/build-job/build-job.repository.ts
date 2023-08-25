import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BuildJob,
  BuildJobDocument,
} from '../../schemas/build-job/build-job.schema';

@Injectable()
export class BuildJobRepository {
  constructor(
    @InjectModel(BuildJob.name)
    private readonly buildJobModel: Model<BuildJobDocument>,
  ) {}

  async createBuildJob(
    configurationId: string,
    configurationRevisionId: string,
  ): Promise<BuildJobDocument> {
    const newBuildJob: BuildJob = {
      configurationId,
      configurationRevisionId,
      createdAt: new Date(),
      platforms: [],
    };
    return this.buildJobModel.create(newBuildJob);
  }

  async getBuildJobForConfigurationRevision(
    configurationId: string,
    configurationRevisionId: string,
  ): Promise<BuildJobDocument | null> {
    return this.buildJobModel.findOne({
      configurationId,
      configurationRevisionId,
    });
  }

  async getBuildJobForConfigurationRevisionOrThrow(
    configurationId: string,
    configurationRevisionId: string,
  ): Promise<BuildJobDocument> {
    const buildJobDocument = await this.getBuildJobForConfigurationRevision(
      configurationId,
      configurationRevisionId,
    );

    if (!buildJobDocument) {
      throw new NotFoundException();
    }

    return buildJobDocument;
  }
}
