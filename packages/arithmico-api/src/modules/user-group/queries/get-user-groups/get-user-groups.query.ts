export class GetUserGroupsQuery {
  constructor(
    public readonly skip: number,
    public readonly limit: number,
    public readonly policyId?: string,
    public readonly userId?: string,
  ) {}
}
