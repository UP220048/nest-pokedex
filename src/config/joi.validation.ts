import * as joi from 'joi';

export const JoiValidation = joi.object({
    MONGODB: joi.string().required(),
    PORT: joi.number().default(3000),
    DEFAULT_LIMIT: joi.number().default(7),
});