import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  domain: process.env.JWT_COOKIE_DOMAIN,
  accessTokenLifetime: process.env.JWT_ACCESS_TOKEN_LIFETIME,
  refreshTokenLifetime: process.env.JWT_REFRESH_TOKEN_LIFETIME,
}));
