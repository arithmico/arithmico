import { PagedResponse } from '../../../../common/types/paged-response.dto';
import { UserDto } from '../../common/user.dto';

export class UserResponseDto extends UserDto {
  securityPolicies: number;
  userGroups: number;
}

export class GetUsersResponseDto extends PagedResponse<UserResponseDto> {}
