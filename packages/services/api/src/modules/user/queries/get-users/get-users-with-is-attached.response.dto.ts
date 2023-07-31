import { UserDto } from '../../common/user.dto';

export class GetUsersWithIsAttachedResponseDto extends UserDto {
  isAttached: boolean;
}
