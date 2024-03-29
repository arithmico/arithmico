export interface UserGroupSecurityPolicyAttachmentDto {
  userGroupId: string;
  securityPolicyId: string;
}

export interface UserGroupDto {
  id: string;
  name: string;
  createdAt: string;
  readonly: boolean;
}

export interface UserGroupWithAttachmentCheckDto extends UserGroupDto {
  isAttached: boolean;
}

export interface UserGroupWithMembershipCheckDto extends UserGroupDto {
  isMember: boolean;
}

export interface UserGroupWithDetailsDto extends UserGroupDto {
  members: number;
}

export interface CreateUserGroupArgs {
  name: string;
}

export interface GetUserGroupByIdArgs {
  groupId: string;
}

export interface RenameUserGroupArgs {
  groupId: string;
  name: string;
}

export interface DeleteUserGroupArgs {
  groupId: string;
}

export interface GetSecurityPoliciesAttachedToUserGroupArgs {
  groupId: string;
  skip: number;
  limit: number;
}

export interface AttachSecurityPolicyToUserGroupArgs {
  groupId: string;
  policyId: string;
}

export interface DetachSecurityPolicyToUserGroupArgs {
  groupId: string;
  policyId: string;
}

export interface GetUserGroupsWithAttachmentCheckArgs {
  skip: number;
  limit: number;
  policyId: string;
}

export interface GetUserGroupsForSecurityPolicyArgs {
  skip: number;
  limit: number;
  policyId: string;
}

export interface GetUserGroupsForUserArgs {
  skip: number;
  limit: number;
  userId: string;
}

export interface GetUserGroupsWithMembershipCheckArgs {
  skip: number;
  limit: number;
  userId: string;
}
