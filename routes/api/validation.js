const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
});

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ status: "error", code: 400, message: error.message });
  }
};

module.exports = { schemaCreateContact, schemaUpdateContact, validateBody };
