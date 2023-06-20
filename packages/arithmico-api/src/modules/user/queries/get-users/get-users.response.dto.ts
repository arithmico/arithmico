import { PagedResponse } from '../../../../common/types/paged-response.dto';

export class UserResponseDto {
  id: string;
  username: string;
  securityPolicies: number;
  userGroups: number;
  createdAt: Date;
}

export class GetUsersResponseDto extends PagedResponse<UserResponseDto> {}
