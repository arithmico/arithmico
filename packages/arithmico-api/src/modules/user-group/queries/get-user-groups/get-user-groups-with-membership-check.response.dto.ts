import { UserGroupDto } from '../../common/user-group.dto';

export class GetUserGroupsWithMembershipCheckResponseDto extends UserGroupDto {
  isMember: boolean;
}
