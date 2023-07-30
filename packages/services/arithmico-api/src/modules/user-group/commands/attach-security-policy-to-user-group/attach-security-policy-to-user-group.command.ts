export class AttachSecurityPolicyToUserGroupCommand {
  constructor(
    public readonly groupId: string,
    public readonly policyId: string,
  ) {}
}
