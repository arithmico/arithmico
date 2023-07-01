import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { commandHandlers, commandControllers } from './commands';
import { queryControllers, queryHandlers } from './queries';

@Module({
  imports: [CqrsModule, DatabaseModule],
  providers: [...commandHandlers, ...queryHandlers],
  controllers: [...commandControllers, ...queryControllers],
})
export class FeatureFlagModule {}
