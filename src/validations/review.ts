import Joi from 'joi';

export const reviewValidation = Joi.object({
    stars: Joi.string()
        .valid("0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5")
    ,
    title: Joi.string()
        .pattern(/^[\w\-\s]+$/)
        .min(3)
        .max(30)
        .trim()
        .required()
    ,
    description: Joi.string()
        .min(3)
        .max(500)
        .trim()
        .required()
});