import Joi from 'joi';

export const userValidation = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
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
    firstName: Joi.string()
        .min(3)
        .max(20)
        .trim()
        .required()
    ,
    lastName: Joi.string()
        .min(3)
        .max(20)
        .trim()
        .required()
    ,
    avatar: Joi.string().allow(null),
    confirmed: Joi.boolean()
    ,
    role: Joi.string()
        .valid("USER", "MOD", "ADMIN")
});