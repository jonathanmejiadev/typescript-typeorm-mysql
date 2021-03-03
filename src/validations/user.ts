import Joi from 'joi';

export const userValidation = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(10)
        .trim()
        .required()
    ,
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: true }
        })
        .required()
    ,
    password: Joi.string()
        .alphanum()
        .min(6)
        .max(12)
        .required()
    ,
    roles: Joi.array()
        .items(Joi.string())

});