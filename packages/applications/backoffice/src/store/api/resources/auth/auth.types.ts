export interface CredentialsDto {
  accessToken: string;
  refreshToken: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface SecurityAttributesDto {
  securityAttributes: string[];
}
