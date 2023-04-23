import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production', 'testing')
    .default('development'),
  CORS_ENABLED: Joi.boolean().default(false),
  PORT: Joi.number().default(3000),
  MONGODB_URI: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  SEED_USERNAME: Joi.string().required(),
  SEED_EMAIL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_COOKIE_DOMAIN: Joi.string().required(),
  JWT_ACCESS_TOKEN_LIFETIME: Joi.number().default(1000 * 60 * 60),
  JWT_REFRESH_TOKEN_LIFETIME: Joi.number().default(1000 * 60 * 60 * 24 * 7),
});
