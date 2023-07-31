export class AttachSecurityPolicyToUserCommand {
  constructor(
    public readonly userId: string,
    public readonly policyId: string,
  ) {}
}
