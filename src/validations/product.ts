import Joi from 'joi';

export const productValidation = Joi.object({
    name: Joi.string()
        .pattern(/^[\w\-\s]+$/)
        .min(3)
        .max(20)
        .trim()
        .required()
    ,
    stock: Joi.number()
        .min(1)
        .max(99)
        .required()
});