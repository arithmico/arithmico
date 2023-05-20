export class GetSecurityPoliciesAttachedToUserQuery {
  constructor(
    public readonly userId: string,
    public readonly skip: number,
    public readonly limit: number,
  ) {}
}
