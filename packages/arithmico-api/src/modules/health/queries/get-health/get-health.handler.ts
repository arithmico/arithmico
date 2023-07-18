import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetHealthQuery } from './get-health.query';

@QueryHandler(GetHealthQuery)
export class GetHealthHandler implements IQueryHandler<GetHealthQuery> {
  async execute(): Promise<void> {
    return;
  }
}
