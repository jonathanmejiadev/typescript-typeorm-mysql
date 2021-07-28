import Joi from 'joi';

export const productValidation = Joi.object({
    name: Joi.string()
        .pattern(/^[\w\-\s]+$/)
        .min(3)
        .max(20)
        .trim()
        .required()
    ,
    description: Joi.string()
        .pattern(/^[\w\-\s]+$/)
        .min(3)
        .max(2000)
        .trim()
        .required()
    ,
    stock: Joi.number()
        .min(0)
        .max(999)
        .required()
    ,
    price: Joi.number()
        .precision(2)
        .required()
    ,
    images: Joi.array()
        .items(Joi.string())
});