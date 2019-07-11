'use strict';

const Util = require('../helpers/Util');

async function update(filePath, line, newTodo) {
  /* eslint brace-style: 2 */
  try {
    const todosJSON = await Util.getJSONFromFile(filePath);

    const todoList = todosJSON.todos;

    if (isNaN(line)) {
      return console.log(`'${line}' is not an expected number value!`);
    }

    if (todoList.length === 0) {
      return console.log('The file is already empty!');
    }

    if (line > todoList.length) {
      return console.log(
        `You can't update line '${line}'. Maximum line number is '${todoList.length}'`
      );
    }

    const oldTodo = todoList[line - 1];

    todoList.splice(line - 1, 1, newTodo);

    (async() => {
      await Util.write(filePath, JSON.stringify(todosJSON), 'utf8');
      console.log(`In line ${line} '${oldTodo}' is changed to '${newTodo}'`);
    })();
  } catch (error) {
    console.log(error);
  }
}

module.exports = update;
