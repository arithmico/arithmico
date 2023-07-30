export class GetUsersAttachedToSecurityPolicyQuery {
  constructor(
    public readonly policyId: string,
    public readonly skip: number,
    public readonly limit: number,
  ) {}
}
