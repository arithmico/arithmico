export interface UserGroupDto {
  id: string;
  name: string;
  createdAt: string;
  readonly: boolean;
}

export interface UserGroupDtoWithMembers extends UserGroupDto {
  members: number;
}
