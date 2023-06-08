import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../../../infrastructure/database/database.module';
import { commandControllers, commandHandlers } from './commands';
import { queryControllers, queryHandlers } from './queries';

@Module({
  imports: [DatabaseModule, CqrsModule],
  providers: [...commandHandlers, ...queryHandlers],
  controllers: [...commandControllers, ...queryControllers],
})
export class GroupModule {}
