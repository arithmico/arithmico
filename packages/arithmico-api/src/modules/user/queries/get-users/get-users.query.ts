export class GetUsersQuery {
  constructor(
    public readonly skip: number,
    public readonly limit: number,
    public readonly groupId?: string,
    public readonly policyId?: string,
  ) {}
}
