'use strict';

const Util = require('../helpers/Util');

async function list(filePath) {
  const todosJSON = await Util.getJSONFromFile(filePath);

  if (todosJSON.todos.length === 0) {
    return console.log(`There is no data in '${filePath}' file!`);
  }

  console.log(`------\nTodos:\n------`);
  todosJSON.todos.forEach((todo, index) => {
    console.log(`${index + 1}. ${todo}`);
  });
}

module.exports = list;
