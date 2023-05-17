export class CreateSecurityPolicyCommand {
  constructor(
    public readonly name: string,
    public readonly attributes: string[],
  ) {}
}
