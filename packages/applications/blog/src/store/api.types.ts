export interface PagedResponse<T> {
  skip: number;
  limit: number;
  total: number;
  items: T[];
}

export interface ConfigurationDto {
  id: string;
  name: string;
  latestBuildJob: {
    revision: number;
    version: {
      major: number;
      minor: number;
      patch: number;
    };
    platforms: {
      platform: string;
      artifactUrl: string;
    }[];
  };
}

export interface ConfigurationDetailsDto {
  id: string;
  name: string;
  buildJobs: {
    buildJobId: string;
    version: {
      major: number;
      minor: number;
      patch: number;
    };
    revision: number;
    platforms: {
      platform: string;
      artifactUrl: string;
    }[];
  }[];
}

export interface GetConfigurationsArgs {
  skip: number;
  limit: number;
}

export interface GetConfigurationDetailsArgs {
  configurationId: string;
}
