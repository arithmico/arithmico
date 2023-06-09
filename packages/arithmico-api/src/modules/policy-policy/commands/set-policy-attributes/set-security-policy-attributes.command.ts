export class SetSecurityPolicyAttributesCommand {
  constructor(
    public readonly policyId: string,
    public readonly attributes: string[],
  ) {}
}
