import { UserDto } from '../../common/user.dto';

export class GetUsersResponseDto extends UserDto {
  securityPolicies: number;
  userGroups: number;
}
