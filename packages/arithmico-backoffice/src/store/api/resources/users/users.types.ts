export interface UserDto {
  id: string;
  username: string;
  createdAt: string;
}

export interface UserResponseDto extends UserDto {
  userGroups: number;
  securityPolicies: number;
}

export interface GetUsersArgs {
  skip: number;
  limit: number;
}

export interface CreateUserArgs {
  username: string;
  email: string;
}
