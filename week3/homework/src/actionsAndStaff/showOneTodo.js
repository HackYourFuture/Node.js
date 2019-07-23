'use strict';

const { findToDoWithId } = require('./writeFindCheckError');

const showOneToDo = async id => {
  try {
    const { toDoList, index } = await findToDoWithId(id);
    return toDoList.todos[index];
  } catch (error) {
    throw error;
  }
};

module.exports = showOneToDo;
