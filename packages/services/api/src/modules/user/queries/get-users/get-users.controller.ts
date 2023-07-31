import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { SecurityAttribute } from '../../../../common/constants/security-attributes.enum';
import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { SecurityAttributes } from '../../../../decorators/security-attributes.decorator';
import { GetUsersWithIsAttachedResponseDto } from './get-users-with-is-attached.response.dto';
import { GetUsersWithIsGroupMemberResponseDto } from './get-users-with-is-group-member.response.dto';
import { GetUsersQuery } from './get-users.query';
import { GetUsersRequestQueryDto } from './get-users.request.query.dto';
import { GetUsersResponseDto } from './get-users.response.dto';

@Controller()
export class GetUsersController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @SecurityAttributes(SecurityAttribute.UsersRead)
  async createUser(
    @Query() query: GetUsersRequestQueryDto,
  ): Promise<
    | PagedResponse<GetUsersResponseDto>
    | PagedResponse<GetUsersWithIsGroupMemberResponseDto>
    | PagedResponse<GetUsersWithIsAttachedResponseDto>
  > {
    return this.queryBus.execute(
      new GetUsersQuery(
        query.skip,
        query.limit,
        query.checkGroupMembership,
        query.checkSecurityPolicyAttachment,
      ),
    );
  }
}
