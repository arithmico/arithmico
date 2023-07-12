import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  mongodb_uri: process.env.MONGODB_URI,
}));
