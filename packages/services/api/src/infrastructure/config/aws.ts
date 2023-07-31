import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  access_key_id: process.env.AWS_ACCESS_KEY_ID,
  secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
}));
