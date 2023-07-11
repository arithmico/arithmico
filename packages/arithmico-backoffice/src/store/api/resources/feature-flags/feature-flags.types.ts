export enum FeatureFlagType {
  Constant = "constant",
  Function = "function",
  Method = "method",
  Operator = "operator",
  Type = "type",
}

export interface SemanticVersionDto {
  major: number;
  minor: number;
  patch: number;
}

export interface FeatureFlagDto {
  id: string;
  name: string;
  flag: string;
  type: FeatureFlagType;
  enabledSinceVersionTagId: string;
  disabledSinceVersionTagId?: string;
}

export interface FeatureFlagWithVersionsDto {
  id: string;
  name: string;
  flag: string;
  type: FeatureFlagType;
  enabledSinceVersion: SemanticVersionDto;
  disabledSinceVersion?: SemanticVersionDto;
}

export interface CreateFeatureFlagArgs {
  type: FeatureFlagType;
  name: string;
  flag: string;
  enabledSinceVersionTagId: string;
}

export interface GetFeatureFlagsArgs {
  skip: number;
  limit: number;
}

export interface GetFeatureFlagByidArgs {
  flagId: string;
}

export interface GetFeatureFlagsForVersionTagArgs {
  tagId: string;
  skip: number;
  limit: number;
}
