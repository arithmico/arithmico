export interface UserResponseDto {
  id: string;
  username: string;
}

export interface GetUsersArgs {
  skip: number;
  limit: number;
}
