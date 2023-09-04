import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import {
  BuildJob,
  BuildJobDocument,
} from '../../schemas/build-job/build-job.schema';
import {
  PlatformBuildJobPlatform,
  PlatformBuildJobStatus,
} from '../../schemas/build-job/platform-build-job.schema';

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
      webhookToken: nanoid(),
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

  async addPlatformBuildJob(
    buildJobId: string,
    platform: PlatformBuildJobPlatform,
  ): Promise<BuildJobDocument | null> {
    return this.buildJobModel.findOneAndUpdate(
      { _id: buildJobId },
      {
        $addToSet: {
          platforms: {
            status: PlatformBuildJobStatus.Running,
            platform,
          },
        },
      },
    );
  }

  async addPlatformBuildJobOrThrow(
    buildJobId: string,
    platform: PlatformBuildJobPlatform,
  ): Promise<BuildJobDocument | null> {
    const buildJobDocument = await this.addPlatformBuildJob(
      buildJobId,
      platform,
    );
    if (!buildJobDocument) {
      throw new NotFoundException();
    }
    return buildJobDocument;
  }
}
