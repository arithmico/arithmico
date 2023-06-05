import { Controller, Get, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAvailableSecurityAttributesQuery } from './get-available-security-attributes.query';

@Controller('available-attributes')
export class GetAvailableSecurityAttributesController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getAvailableAttributes(): Promise<string[]> {
    Logger.log('test');
    return await this.queryBus.execute(
      new GetAvailableSecurityAttributesQuery(),
    );
  }
}
