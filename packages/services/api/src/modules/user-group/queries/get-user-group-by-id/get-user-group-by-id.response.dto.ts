import { UserGroupDto } from '../../common/user-group.dto';

export class GetUserGroupByIdResponseDto extends UserGroupDto {
  members: number;
}
