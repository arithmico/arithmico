import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { GetAvailableSecurityAttributesQuery } from './get-available-security-attributes.query';

@QueryHandler(GetAvailableSecurityAttributesQuery)
export class GetAvailableSecurityAttributesHandler
  implements IQueryHandler<GetAvailableSecurityAttributesQuery>
{
  async execute(): Promise<string[]> {
    return Object.values(SecurityAttribute);
  }
}
