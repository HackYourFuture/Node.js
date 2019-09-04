const Joi = require('@hapi/joi');

function Validator() {
  const validateCounter = function(counter) {
    const schema = {
      name: Joi.string()
        .min(3)
        .required()
    };
    return Joi.validate(counter, schema);
  };
  this.userValidator = function(req, res, next) {
    const { error } = validateCounter(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else next();
  };
}
module.exports = Validator;
