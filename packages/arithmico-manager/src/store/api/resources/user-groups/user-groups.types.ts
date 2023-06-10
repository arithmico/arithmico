export interface UserGroupDto {
  id: string;
  name: string;
  createdAt: string;
}

export interface UserGroupDtoWithMembers extends UserGroupDto {
  members: number;
}
