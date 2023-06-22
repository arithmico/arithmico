export interface UserDto {
  id: string;
  username: string;
  createdAt: string;
  email: string;
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

export interface ActivateUserArgs {
  activationId: string;
  password: string;
}

export interface GetUserByIdArgs {
  userId: string;
}

export interface GetSecurityPoliciesAttachedToUserArgs {
  userId: string;
}

export interface AttachSecurityPolicyToUserArgs {
  userId: string;
  policyId: string;
}

export interface DetachSecurityPolicyFromUserArgs {
  userId: string;
  policyId: string;
}
