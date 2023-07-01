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
