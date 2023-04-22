export class SendActivationEmailEvent {
  constructor(
    public readonly to: string,
    public readonly username: string,
    public readonly activateUrl: string,
  ) {}
}
