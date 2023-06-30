import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { processors } from './processors';

@Module({
  imports: [
    HttpModule,
    CqrsModule,
    BullModule.registerQueue({
      name: 'cron-jobs',
    }),
    DatabaseModule,
  ],
  providers: [...processors],
})
export class VersionTagModule {}
