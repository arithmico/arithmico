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

export interface ConfigurationRevisionDto {
  id: string;
  revision: number;
  configurationId: string;
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

export interface GetConfigurationRevisionsArgs {
  configurationId: string;
  skip: number;
  limit: number;
}

export interface GetConfigurationRevisionsResponse {
  id: string;
  revision: number;
  configurationId: string;
  minimumVersion: {
    major: number;
    minor: number;
    patch: number;
  };
  associatedFeatureFlags: number;
}

export interface CreateConfigurationRevisionArgs {
  configurationId: string;
  featureFlagIds: string[];
  minimumVersionTagId: string;
}

export interface GetConfigurationRevisionByIdArgs {
  configurationId: string;
  revisionId: string;
}

export interface GetLatestConfigurationRevisionFeatureFlagIdsArgs {
  configurationId: string;
}

export interface GetLatestConfigurationRevisionFeatureFlagIdsResponse {
  featureFlagIds: string[];
}
