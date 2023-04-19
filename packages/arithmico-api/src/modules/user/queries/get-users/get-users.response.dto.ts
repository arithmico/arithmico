import { PagedResponse } from '../../../../common/types/paged-response.dto';

export class UserResponseDto {
  username: string;
}

export class GetUsersResponseDto extends PagedResponse<UserResponseDto> {}
