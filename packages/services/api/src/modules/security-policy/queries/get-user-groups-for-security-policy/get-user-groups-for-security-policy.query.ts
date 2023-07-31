export class GetUserGroupsForSecurityPolicyQuery {
  constructor(
    public readonly skip: number,
    public readonly limit: number,
    public readonly policyId: string,
  ) {}
}
