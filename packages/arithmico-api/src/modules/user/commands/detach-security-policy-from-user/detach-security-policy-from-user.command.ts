export class DetachSecurityPolicyFromUserCommand {
  constructor(
    public readonly userId: string,
    public readonly policyId: string,
  ) {}
}
