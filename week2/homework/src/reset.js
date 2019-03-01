const writeTodos = require('./writeFile');

const reset = () => {
  writeTodos([]);
  console.log('Successfully removed all items');
};

module.exports = reset;
