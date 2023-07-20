export class CreateConfigurationCommand {
  constructor(
    public readonly name: string,
    public readonly autoBuild: boolean,
  ) {}
}
