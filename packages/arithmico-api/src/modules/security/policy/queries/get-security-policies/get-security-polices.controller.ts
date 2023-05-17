import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../../common/types/paged-response.dto';
import { GetSecurityPoliciesQuery } from './get-security-policies.query';
import { GetSecurityPoliciesRequestDto } from './get-security-policies.request.dto';
import { GetSecurityPoliciesResponseDto } from './get-security-policies.response.dto';

@Controller()
export class GetSecurityPoliciesController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getSecurityPolices(
    @Query() queryDto: GetSecurityPoliciesRequestDto,
  ): Promise<PagedResponse<GetSecurityPoliciesResponseDto>> {
    return this.queryBus.execute(
      new GetSecurityPoliciesQuery(queryDto.limit, queryDto.skip),
    );
  }
}
