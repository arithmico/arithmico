export class GetSecurityPoliciesAttachedToUserGroupQuery {
  constructor(
    public readonly groupId: string,
    public readonly skip: number,
    public readonly limit: number,
  ) {}
}
