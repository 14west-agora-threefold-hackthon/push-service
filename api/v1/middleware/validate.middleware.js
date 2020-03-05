const httpStatusCode = require('http-status-codes');
const Joi = require('@hapi/joi');

module.exports = (schema, property = 'body') => {
  return async (req, res, next) => {
    try {
      // If schema validation fails execution falls through to the catch block
      await Joi.validate(req[property], schema);
      next();
    } catch (error) {
      let err;
      const { details } = error;
      if (details) {
        const message = details.map(i => i.message).join(',');
        err = { message };
        err.httpStatusCode = httpStatusCode.UNPROCESSABLE_ENTITY;
      }
      next(err);
    }
  };
};
