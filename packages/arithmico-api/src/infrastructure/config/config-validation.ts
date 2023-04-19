import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production', 'testing')
    .default('development'),
  CORS_ENABLED: Joi.boolean().default(false),
  PORT: Joi.number().default(3000),
  MONGODB_URI: Joi.string().required(),
});
