const Joi = require('joi');

function validateTodos(todo) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
  };
  return Joi.validate(todo, schema);
}

module.exports = validateTodos;
