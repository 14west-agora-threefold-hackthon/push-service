const Joi = require('@hapi/joi');

const emailCreate = Joi.object().keys({
  customerFirstName: Joi.string().allow(''),
  customerLastName: Joi.string().allow(''),
  customerEmail: Joi.string().email({ minDomainSegments: 2 }),
  id: Joi.number().optional(),
  transactionType: Joi.string()
    .allow('')
    .optional(),
  customerNumber: Joi.string()
    .allow('')
    .optional(),
  paymentProcessor: Joi.string()
    .allow('')
    .optional(),
  transactionStatus: Joi.string()
    .allow('')
    .optional(),
  reasonCode: Joi.string()
    .allow('')
    .allow(null)
    .optional(),
  reasonMessage: Joi.string()
    .allow('')
    .allow(null)
    .optional(),
  price: Joi.number().optional(),
  dateAndTime: Joi.number().optional(),
  orderId: Joi.string()
    .allow('')
    .optional(),
  owningOrg: Joi.string()
    .allow('')
    .optional(),
  paymentType: Joi.string()
    .allow('')
    .optional(),
  cardExpirationMonth: Joi.number().optional(),
  cardExpirationYear: Joi.number().optional()
});

module.exports = {
  emailCreate
};
