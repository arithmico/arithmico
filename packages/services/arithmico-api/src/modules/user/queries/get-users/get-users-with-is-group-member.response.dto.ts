import { UserDto } from '../../common/user.dto';

export class GetUsersWithIsGroupMemberResponseDto extends UserDto {
  isMember: boolean;
}
