import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Public } from '../../../../decorators/public.decorator';
import { GetHealthQuery } from './get-health.query';

@Controller()
export class GetHealthController {
  constructor(private queryBus: QueryBus) {}

  @Public()
  @Get()
  async getHealth(): Promise<void> {
    await this.queryBus.execute(new GetHealthQuery());
  }
}
