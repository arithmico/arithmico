export class AddAttributesToSecurityPolicyCommand {
  constructor(
    public readonly policyId: string,
    public readonly attributes: string[],
  ) {}
}
