export interface ConfigurationDto {
  id: string;
  name: string;
  autoBuild: boolean;
}

export interface CreateConfigurationArgs {
  name: string;
  autoBuild: boolean;
}

export interface GetConfigurationsArgs {
  skip: number;
  limit: number;
}
