const Joi = require('joi');

module.exports = Joi.object({
    fromAddress: Joi.string(),
    toAddress: Joi.string(),
    id: Joi.string(),
    blockNumber: Joi.number().integer().min(0),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
});
