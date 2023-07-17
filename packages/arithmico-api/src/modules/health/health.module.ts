import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { queryControllers, queryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  providers: [...queryHandlers],
  controllers: [...queryControllers],
})
export class HealthModule {}
