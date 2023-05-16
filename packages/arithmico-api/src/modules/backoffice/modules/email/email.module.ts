import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../../../../infrastructure/database/database.module';
import { EmailProcessor } from './email.processor';
import { EmailService } from './email.service';
import { eventHandlers } from './events';

@Module({
  imports: [
    CqrsModule,
    BullModule.registerQueue({
      name: 'cron-jobs',
    }),
    DatabaseModule,
  ],
  providers: [...eventHandlers, EmailService, EmailProcessor],
})
export class EmailModule {}
