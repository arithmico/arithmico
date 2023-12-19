import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Queue } from 'bull';

const MINUTE = 60 * 1000;

@Injectable()
export class CronJobsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(CronJobsService.name);

  constructor(@InjectQueue('cron-jobs') private cronJobsQueue: Queue) {}

  async onApplicationBootstrap() {
    await this.createCronJob('fetch-emails', 5 * MINUTE);
    await this.createCronJob('sync-git-tags', 1 * MINUTE);
  }

  async createCronJob(jobName: string, repeatEvery: number): Promise<void> {
    const repeatableJobs = await this.cronJobsQueue.getRepeatableJobs();
    const existingJobsWithSameName = repeatableJobs.filter(
      (job) => job.name === jobName,
    );
    await Promise.all(
      existingJobsWithSameName.map((job) =>
        this.cronJobsQueue.removeRepeatableByKey(job.key),
      ),
    );
    this.logger.log(`creating new cron job "${jobName}"`);
    await this.cronJobsQueue.add(
      jobName,
      {},
      {
        repeat: {
          every: repeatEvery,
        },
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }
}
