const Joi = require('@hapi/joi');

function Validator() {
  const validate = function(todo) {
    const schema = Joi.object().keys({
      todo: Joi.object().keys({
        description: Joi.string()
          .min(3)
          .trim()
          .required(),
      }),
    });
    return Joi.validate(todo, schema);
  };
  this.userValidator = function(req, res, next) {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else next();
  };
}
module.exports = Validator;
