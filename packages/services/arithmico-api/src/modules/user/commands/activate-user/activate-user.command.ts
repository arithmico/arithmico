export class ActivateUserCommand {
  constructor(
    public readonly activationId: string,
    public readonly password: string,
  ) {}
}
