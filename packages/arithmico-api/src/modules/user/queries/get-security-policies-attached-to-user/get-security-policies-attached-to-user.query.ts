export class GetSecurityPoliciesAttachedToUserQuery {
  constructor(
    public readonly skip: number,
    public readonly limit: number,
    public readonly userId: string,
  ) {}
}
