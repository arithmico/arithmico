export class DetachSecurityPolicyFromUserGroupCommand {
  constructor(
    public readonly groupId: string,
    public readonly policyId: string,
  ) {}
}
