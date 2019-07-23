'use strict';

const { findToDoWithId, isToDoValid, write } = require('./writeFindCheckError');

const update = async (request, id) => {
  try {
    const { toDoList, index } = await findToDoWithId(id);
    const todo = isToDoValid(request);
    toDoList.todos[index].description = todo.description;
    return await write(toDoList);
  } catch (error) {
    throw error;
  }
};

module.exports = update;
