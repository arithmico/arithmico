import { Controller, Get, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { GetAvailableSecurityAttributesQuery } from './get-available-security-attributes.query';

@Controller('available-attributes')
export class GetAvailableSecurityAttributesController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @SecurityAttributes(SecurityAttribute.SecurityPoliciesRead)
  async getAvailableAttributes(): Promise<string[]> {
    Logger.log('test');
    return await this.queryBus.execute(
      new GetAvailableSecurityAttributesQuery(),
    );
  }
}
