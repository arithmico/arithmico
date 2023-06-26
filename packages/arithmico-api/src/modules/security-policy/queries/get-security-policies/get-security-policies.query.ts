export class GetSecurityPoliciesQuery {
  constructor(
    public readonly skip: number,
    public readonly limit: number,
    public readonly checkAttachedToUserGroup?: string,
    public readonly checkAttachedToUser?: string,
  ) {}
}
