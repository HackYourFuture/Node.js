'use strict';

let program = require('commander');

const {

  addTodo,
  listTodos,
  removeTodo,
  resetTodo,
  updateTodo,
  help,
  promisify,
  readFile,
  writeFile,
  appendFile,
  readFileWithPromise,
  writeFileWithPromise,
  appendFileWithPromise,
  TODO_FILE,
  args,
  cmd

} = require('./functions');

program
  .version('0.1.0')
  .option('-a, --add', 'Add TODO')
  .option('-l, --list', 'List TODOs')
  .option('-r, --remove', 'Remove specific TODO')
  .option('-d, --reset', 'Remove All TODOs')
  .option('-u, --update', 'Update specific TODO')
  .parse(process.argv);

async function main() {

  if (program.add) {
    addTodo();

  }
  if (program.list) {
    listTodos();
  }
  if (program.remove) {
    removeTodo();
  }

  if (program.reset) {
    resetTodo();
  }

  if (program.update) {
    updateTodo();
  }

}
main();