import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetSecurityPoliciesAttachedToUserQuery } from './get-security-policies-attached-to-user.query';
import { GetSecurityPoliciesAttachedToUserPathDto } from './get-security-policies-attached-to-user.path.dto';
import { GetSecurityPoliciesAttachedToUserResponseDto } from './get-security-policies-attached-to-user.response.dto';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { PageParameterQueryDto } from '../../../../common/dtos/PageParameters.query.dto';

@Controller()
export class GetSecurityPoliciesAttachedToUserController {
  constructor(private queryBus: QueryBus) {}

  @Get(':userId/security-policies')
  @SecurityAttributes(SecurityAttribute.UsersSecurityPoliciesRead)
  async getSecurityPolicesAttachedToUser(
    @Param() params: GetSecurityPoliciesAttachedToUserPathDto,
    @Query() query: PageParameterQueryDto,
  ): Promise<GetSecurityPoliciesAttachedToUserResponseDto[]> {
    return this.queryBus.execute(
      new GetSecurityPoliciesAttachedToUserQuery(
        params.userId,
        query.skip,
        query.limit,
      ),
    );
  }
}
