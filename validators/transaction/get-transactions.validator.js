const Joi = require('joi');

module.exports = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
    from: Joi.string().hex().length(42),
    to: Joi.string().hex().length(42),
});
