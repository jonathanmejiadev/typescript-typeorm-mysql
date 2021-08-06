import Joi from 'joi';

export const categoryValidation = Joi.object({
    name: Joi.string()
        .pattern(/^[\w\-\s]+$/)
        .min(3)
        .max(30)
        .trim()
        .required()
    ,
    description: Joi.string()
        .min(3)
        .max(1500)
        .trim()
        .required()
});