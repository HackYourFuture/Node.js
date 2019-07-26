'use strict';

const { findToDoWithId } = require('./writeFindCheckError');

const showOneToDo = async id => {
  const { toDoList, index } = await findToDoWithId(id);
  return toDoList.todos[index];
};

module.exports = showOneToDo;
