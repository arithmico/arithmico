export interface ConfigurationDto {
  id: string;
  name: string;
  autoBuild: boolean;
}

export interface ConfigurationWithRevisionsDto {
  id: string;
  name: string;
  autoBuild: boolean;
  revisions: number;
}

export interface CreateConfigurationArgs {
  name: string;
  autoBuild: boolean;
}

export interface GetConfigurationsArgs {
  skip: number;
  limit: number;
}

export interface GetConfigurationByIdArgs {
  configurationId: string;
}
