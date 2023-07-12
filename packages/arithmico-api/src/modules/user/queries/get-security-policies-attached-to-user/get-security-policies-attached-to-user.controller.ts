import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetSecurityPoliciesAttachedToUserQuery } from './get-security-policies-attached-to-user.query';
import { GetSecurityPoliciesAttachedToUserRequestParamsDto } from './get-security-policies-attached-to-user.request.params.dto';
import { GetSecurityPoliciesAttachedToUserResponseDto } from './get-security-policies-attached-to-user.response.dto';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { GetSecurityPoliciesAttachedToUserRequestQueryDto } from './get-security-policies-attached-to-user.request.query.dto';
import { PagedResponse } from '../../../../common/types/paged-response.dto';

@Controller()
export class GetSecurityPoliciesAttachedToUserController {
  constructor(private queryBus: QueryBus) {}

  @Get(':userId/security-policies')
  @SecurityAttributes(
    SecurityAttribute.UsersRead,
    SecurityAttribute.SecurityPoliciesRead,
  )
  async getSecurityPolicesAttachedToUser(
    @Param() params: GetSecurityPoliciesAttachedToUserRequestParamsDto,
    @Query() query: GetSecurityPoliciesAttachedToUserRequestQueryDto,
  ): Promise<PagedResponse<GetSecurityPoliciesAttachedToUserResponseDto>> {
    return this.queryBus.execute(
      new GetSecurityPoliciesAttachedToUserQuery(
        query.skip,
        query.limit,
        params.userId,
      ),
    );
  }
}
