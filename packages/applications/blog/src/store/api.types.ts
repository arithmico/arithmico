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

export interface GetConfigurationsArgs {
  skip: number;
  limit: number;
}
