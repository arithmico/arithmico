export class RemoveAttributeFromSecurityPolicyCommand {
  constructor(
    public readonly policyId: string,
    public readonly attributes: string[],
  ) {}
}
