export interface UserResponseDto {
  id: string;
  username: string;
  createdAt: string;
  userGroups: number;
  securityPolicies: number;
}

export interface GetUsersArgs {
  skip: number;
  limit: number;
}
