'use strict';

const Util = require('../helpers/Util');

async function reset(filePath) {
  /* eslint brace-style: 2 */
  try {
    const todoJSON = { todos: [] };
    await Util.write(filePath, JSON.stringify(todoJSON));
    console.log(`Now, file is empty!`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = reset;
