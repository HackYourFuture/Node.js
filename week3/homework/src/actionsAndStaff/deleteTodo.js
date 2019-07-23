'use strict';

const fs = require('fs');

const { LIST_FILE_PATH, findToDoWithId, write } = require('./writeFindCheckError');

const deleteToDo = async id => {
  try {
    if (!id) {
      await fs.unlink(LIST_FILE_PATH, error => {
        if (error && error.code !== 'ENOENT') throw error;
      });
      return { todos: [] };
    } else {
      const { toDoList, index } = await findToDoWithId(id);
      toDoList.todos.splice([index], 1);
      return await write(toDoList);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = deleteToDo;
