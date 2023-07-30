import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'cron-jobs',
    }),
  ],
  providers: [CronJobsService],
})
export class QueuesModule {}
