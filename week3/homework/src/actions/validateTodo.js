const Joi = require('joi');

const validateTodo = todo => {
  const schema = {
    todo: Joi.string()
      .min(3)
      .required(),
  };
  return Joi.validate(todo, schema);
};

module.exports = validateTodo;