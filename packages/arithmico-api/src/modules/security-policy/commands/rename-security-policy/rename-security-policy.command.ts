export class RenameSecurityPolicyCommand {
  constructor(
    public readonly policyId: string,
    public readonly name: string,
  ) {}
}
