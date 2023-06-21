import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  node_env: process.env.NODE_ENV,
  cors: process.env.CORS_ENABLED,
  port: process.env.PORT,
  frontendBaseUrl: process.env.FRONTEND_BASE_URL,
}));
