import { UserGroupDto } from '../../common/user-group.dto';

export class GetUserGroupsResponseDto extends UserGroupDto {
  members: number;
}
