const Joi = require('joi');

const credentials = Joi.object({
    email: Joi.string().required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).max(30).required()

});


module.exports = {
    credentials
}




