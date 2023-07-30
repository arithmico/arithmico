export class RemoveUserFromUserGroupCommand {
  constructor(
    public readonly userId: string,
    public readonly groupId: string,
  ) {}
}
