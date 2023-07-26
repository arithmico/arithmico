export class ConfigurationRevisionWithVersionDto {
  id: string;
  revision: number;
  configurationId: string;
  minimumVersion: {
    major: number;
    minor: number;
    patch: number;
  };
}
