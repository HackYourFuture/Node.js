'use strict';

const { findToDoWithId, write } = require('./writeFindCheckError');

const mark = async (id, requestMethod) => {
  const { toDoList, index } = await findToDoWithId(id);
  toDoList.todos[index].done = requestMethod === 'DELETE' ? false : true;
  return write(toDoList);
};

module.exports = mark;
