'use strict';

const Util = require('../helpers/Util');

async function add(filePath, text) {
  /* eslint brace-style: 2 */
  try {
    if (text.length === 0) {
      return console.log('You must enter your text!');
    }

    const todosJSON = await Util.getJSONFromFile(filePath);
    todosJSON.todos = [...todosJSON.todos, ...text];

    await Util.write(filePath, JSON.stringify(todosJSON));
    console.log(`${text.length} todos added succesfully!`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = add;
