import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production', 'testing')
    .default('development'),
  CORS_ENABLED: Joi.boolean().default(false),
  PORT: Joi.number().default(3000),
  MONGODB_URI: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().optional(),
  AWS_SECRET_ACCESS_KEY: Joi.string().optional(),
  SEED_USERNAME: Joi.string().required(),
  SEED_EMAIL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_LIFETIME: Joi.number().default(1000 * 60 * 60),
  JWT_REFRESH_TOKEN_LIFETIME: Joi.number().default(1000 * 60 * 60 * 24 * 7),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  REDIS_PASSWORD: Joi.string().optional(),
  MAIL_BUCKET: Joi.string().required(),
  MAIL_DOMAIN: Joi.string().required(),
  MAIL_MODE: Joi.string().valid('development', 'production').optional(),
  FRONTEND_BASE_URL: Joi.string().uri().required(),
  GITHUB_REPO_URL: Joi.string().uri().required(),
  GITHUB_PAT: Joi.string().optional(),
});
