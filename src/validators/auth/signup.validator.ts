import Joi from 'joi' 

let validationSchema = {
    name: Joi.string().min(1).required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).max(12).required(),
    parentOf: Joi.number().required(),
    childOf: Joi.number().required(),
};

export const Create = Joi.object().keys(validationSchema);