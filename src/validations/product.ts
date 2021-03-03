import Joi from 'joi';

export const productValidation = Joi.object({
    name: Joi.string()
        .alphanum()
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