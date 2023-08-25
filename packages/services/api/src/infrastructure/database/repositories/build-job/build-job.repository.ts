import { Injectable } from '@nestjs/common';
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
    name: string,
    configurationId: string,
    configurationRevisionId: string,
    versionTagId: string,
  ): Promise<BuildJobDocument> {
    const newBuildJob: BuildJob = {
      name,
      configurationId,
      configurationRevisionId,
      versionTagId,
      createdAt: new Date(),
      platforms: [],
    };
    return this.buildJobModel.create(newBuildJob);
  }

  async getBuildJobsForConfigurationRevision(
    configurationId: string,
    configurationRevisionId: string,
  ): Promise<BuildJobDocument[]> {
    return this.buildJobModel.find({
      configurationId,
      configurationRevisionId,
    });
  }
}
