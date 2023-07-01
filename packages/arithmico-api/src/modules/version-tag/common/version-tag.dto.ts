export class VersionTagDto {
  id: string;
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  configurable: boolean;
}
