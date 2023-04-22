import { registerAs } from '@nestjs/config';

export default registerAs('seed_user', () => ({
  username: process.env.SEED_USERNAME,
  email: process.env.SEED_EMAIL,
}));
