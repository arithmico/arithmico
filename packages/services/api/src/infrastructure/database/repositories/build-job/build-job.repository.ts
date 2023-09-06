import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { createPagedAggregationPipeline } from '../../../../common/utils/paged-aggregation/paged-aggregation';
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
      isPublic: false,
    };
    return this.buildJobModel.create(newBuildJob);
  }

  async addPlatformBuildJob(
    platform: PlatformBuildJobPlatform,
    webhookToken: string,
    buildJobId: string,
    configurationId: string,
    configurationRevisionId: string,
  ): Promise<BuildJobDocument | null> {
    return this.buildJobModel.findOneAndUpdate(
      {
        _id: buildJobId,
        webhookToken,
        configurationId,
        configurationRevisionId,
      },
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
    platform: PlatformBuildJobPlatform,
    webhookToken: string,
    buildJobId: string,
    configurationId: string,
    configurationRevisionId: string,
  ): Promise<BuildJobDocument> {
    const buildJobDocument = await this.addPlatformBuildJob(
      platform,
      webhookToken,
      buildJobId,
      configurationId,
      configurationRevisionId,
    );
    if (!buildJobDocument) {
      throw new NotFoundException();
    }
    return buildJobDocument;
  }

  async updatePlatformBuildJob(
    platform: PlatformBuildJobPlatform,
    webhookToken: string,
    buildJobId: string,
    configurationId: string,
    configurationRevisionId: string,
    status: PlatformBuildJobStatus,
    artifactUrl: string | undefined,
  ): Promise<BuildJobDocument> {
    return this.buildJobModel.findOneAndUpdate(
      {
        _id: buildJobId,
        webhookToken,
        configurationId,
        configurationRevisionId,
        'platforms.platform': platform,
      },
      {
        $set: {
          'platforms.$.status': status,
          'platforms.$.artifactUrl': artifactUrl,
        },
      },
    );
  }

  async updatePlatformBuildJobOrThrow(
    platform: PlatformBuildJobPlatform,
    webhookToken: string,
    buildJobId: string,
    configurationId: string,
    configurationRevisionId: string,
    status: PlatformBuildJobStatus,
    artifactUrl: string | undefined,
  ): Promise<BuildJobDocument> {
    const buildJobDocument = await this.updatePlatformBuildJob(
      platform,
      webhookToken,
      buildJobId,
      configurationId,
      configurationRevisionId,
      status,
      artifactUrl,
    );
    if (!buildJobDocument) {
      throw new NotFoundException();
    }
    return buildJobDocument;
  }

  async getBuildJobsForConfigurationRevision(
    configurationId: string,
    configurationRevisionId: string,
    skip: number,
    limit: number,
  ): Promise<PagedResponse<BuildJobDocument>> {
    const result = await this.buildJobModel.aggregate(
      createPagedAggregationPipeline({
        skip,
        limit,
        preProcessingStages: [
          {
            $match: {
              configurationId,
              configurationRevisionId,
            },
          },
        ],
      }),
    );

    return {
      skip,
      limit,
      total: result.at(0)!.total,
      items: result.at(0)!.items,
    };
  }
}
