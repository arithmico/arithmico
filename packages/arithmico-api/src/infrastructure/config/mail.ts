import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  bucket: process.env.MAIL_BUCKET,
  domain: process.env.MAIL_DOMAIN,
  mode: process.env.MAIL_MODE,
}));
