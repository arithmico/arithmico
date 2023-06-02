export interface UserResponseDto {
  userId: string;
  username: string;
}

export interface GetUsersArgs {
  skip: number;
  limit: number;
}
