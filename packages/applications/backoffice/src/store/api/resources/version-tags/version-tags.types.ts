export interface VersionTagDto {
  id: string;
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  configurable: boolean;
}

export interface GetVersionTagsArgs {
  skip: number;
  limit: number;
}

export interface GetVersionTagsForFeatureFlagArgs {
  flagId: string;
  skip: number;
  limit: number;
}

export interface GetVersionTagByIdArgs {
  tagId: string;
}

export interface GetAvailableVersionTagsForConfigurationRevisionArgs {
  configurationId: string;
  configurationRevisionId: string;
  skip: number;
  limit: number;
}
