'use strict';
{
  const help = () => {
    console.log(`
  To use this app, please follow the instructions bellow:

  help    --> node index.js || node index.js help   // Print the app instructions 
  add     --> node index.js add "Any Task"          // Add new task to ToDo list
  remove  --> node index.js remove "Any Task"       // Remove an element from toDo list
  list    --> node index.js list                    // Print all toDoe elements 
  reset   --> node index.js reset                   // Reset toDo list
  `);
  };
  module.exports = help;
}
