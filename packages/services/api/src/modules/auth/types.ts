export interface AccessTokenClaims {
  type: 'accessToken';
  userId: string;
}

export interface RefreshTokenClaims {
  type: 'refreshToken';
  userId: string;
}
