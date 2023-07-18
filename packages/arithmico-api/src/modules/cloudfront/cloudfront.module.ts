import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { queryHandlers } from './queries';
import { GetDistributionsQuery } from './queries/get-distributions/get-distributions.query';

@Module({
  imports: [CqrsModule],
  providers: [...queryHandlers],
})
export class CloudfrontModule implements OnApplicationBootstrap {
  constructor(private queryBus: QueryBus) {}

  async onApplicationBootstrap() {
    await this.queryBus.execute(new GetDistributionsQuery());
  }
}
