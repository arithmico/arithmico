export class AddUserToUserGroupCommand {
  constructor(
    public readonly userId: string,
    public readonly groupId: string,
  ) {}
}
