const fs = require('fs');
const Joi = require('@hapi/joi');

function readCountersFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('counters.json', 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

function saveCounters(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile('counters.json', JSON.stringify(data), err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function validateCounter(counter) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
  };
  return Joi.validate(counter, schema);
}

module.exports = {
  validateCounter,
  saveCounters,
  readCountersFromFile,
};
