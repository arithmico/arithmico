import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Queue } from 'bull';

const MINUTE = 60 * 1000;

@Injectable()
export class CronJobsService implements OnApplicationBootstrap {
  constructor(@InjectQueue('cron-jobs') private cronJobsQueue: Queue) {}

  async onApplicationBootstrap() {
    Logger.log('creating cron jobs');
    await this.cronJobsQueue.add(
      'fetch-emails',
      {},
      {
        jobId: 'fetch-emails',
        repeat: {
          every: 5 * MINUTE,
        },
      },
    );
    await this.cronJobsQueue.add(
      'sync-git-tags',
      {},
      {
        jobId: 'sync-git-tags',
        repeat: {
          every: 10 * MINUTE,
        },
      },
    );
  }
}
