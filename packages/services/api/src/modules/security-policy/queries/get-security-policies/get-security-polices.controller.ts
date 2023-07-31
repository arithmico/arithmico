import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { GetSecurityPoliciesQuery } from './get-security-policies.query';
import {
  GetSecurityPoliciesResponseDtoWithIsAttached,
  GetSecurityPoliciesResponseDtoWithPrincipals,
} from './get-security-policies.response.dto';
import { GetSecurityPoliciesRequestQueryDto } from './get-security-policies.request.query.dto';

@Controller()
export class GetSecurityPoliciesController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @SecurityAttributes(SecurityAttribute.SecurityPoliciesRead)
  async getSecurityPolices(
    @Query() query: GetSecurityPoliciesRequestQueryDto,
  ): Promise<
    | PagedResponse<GetSecurityPoliciesResponseDtoWithPrincipals>
    | PagedResponse<GetSecurityPoliciesResponseDtoWithIsAttached>
  > {
    return this.queryBus.execute(
      new GetSecurityPoliciesQuery(
        query.skip,
        query.limit,
        query.checkAttachedToUserGroup,
        query.checkAttachedToUser,
      ),
    );
  }
}
