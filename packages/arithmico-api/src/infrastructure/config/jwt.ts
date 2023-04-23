import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  domain: process.env.JWT_COOKIE_DOMAIN,
}));
