import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { InboundEmailProducer } from './fetch-emails.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'cron-jobs',
    }),
    DatabaseModule,
  ],
  providers: [InboundEmailProducer],
})
export class InboundEmailModule {}
