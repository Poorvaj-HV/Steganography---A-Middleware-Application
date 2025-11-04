// schema for server side validation using Joi -> without this encoding and decoding form fields can be bypassed or submitted using tools like Hopscotch, Postman etc.

const Joi = require('joi');

module.exports.encodeSchema = Joi.object({
    Encode: Joi.object({
        image : Joi.string().required(),
        message : Joi.string().required().max(500),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5).max(20),
    }).required(),
});