import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  bucket: process.env.MAIL_BUCKET,
}));
