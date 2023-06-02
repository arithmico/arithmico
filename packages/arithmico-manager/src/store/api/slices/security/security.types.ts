export interface SecurityPolicyDto {
  id: string;
  name: string;
  attributes: string[];
}

export interface GetSecurityPoliciesArgs {
  skip: number;
  limit: number;
}
