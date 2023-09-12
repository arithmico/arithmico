import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { queryControllers, queryHandlers } from './queries';

@Module({
  imports: [DatabaseModule, CqrsModule],
  providers: [...queryHandlers],
  controllers: [...queryControllers],
})
export class CmsModule {}
