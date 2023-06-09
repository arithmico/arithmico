import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { GetSecurityPoliciesQuery } from './get-security-policies.query';
import { GetSecurityPoliciesResponseDto } from './get-security-policies.response.dto';
import { PageParameterQueryDto } from '../../../../common/dtos/PageParameters.query.dto';

@Controller()
export class GetSecurityPoliciesController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @SecurityAttributes(SecurityAttribute.SecurityPoliciesRead)
  async getSecurityPolices(
    @Query() query: PageParameterQueryDto,
  ): Promise<PagedResponse<GetSecurityPoliciesResponseDto>> {
    return this.queryBus.execute(
      new GetSecurityPoliciesQuery(query.skip, query.limit),
    );
  }
}
