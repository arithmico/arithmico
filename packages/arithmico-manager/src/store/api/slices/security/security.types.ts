export interface SecurityPolicyDto {
  id: string;
  name: string;
  readonly: boolean;
  attributes: string[];
}

export interface SecurityPolicyDtoWithPrincipalsCount
  extends SecurityPolicyDto {
  principals: number;
}

export interface SecurityPolicyDtoWithPrincipalsDetails
  extends SecurityPolicyDto {
  principals: {
    total: number;
    users: number;
    groups: number;
  };
}

export interface GetSecurityPoliciesArgs {
  skip: number;
  limit: number;
}

export interface GetSecurityPolicyByIdArgs {
  policyId: string;
}

export interface SetSecurityPolicyAttributesRequestDto {
  policyId: string;
  attributes: string[];
}

export interface SetSecurityPolicyAttributesResponseDto {
  id: string;
  name: string;
  attributes: string[];
}

export interface RenameSecurityPolicyArgs {
  policyId: string;
  name: string;
}

export interface CreateSecurityPolicyArgs {
  name: string;
  attributes: string[];
}

export interface DeleteSecurityPolicyArgs {
  policyId: string;
}
