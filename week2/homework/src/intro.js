'use strict';

/** ---------------------------------------
     Function for Command
 ---------------------------------------- */
const help = {
  execute: () => {
    console.log(`
    Commands:

      help                            Show help
      add <newToDo>                   Add a To-Do
      update <toDoNumber> <newToDo>   Update a To-Do
      list                            List all To-Dos
      remove <toDoNumber>             Remove a To-Do
      reset                           Remove all To-Dos
    `);
  }
};

/** ---------------------------------------
     Exports
 ---------------------------------------- */
module.exports = help;
