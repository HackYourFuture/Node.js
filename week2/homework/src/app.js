'use strict';
let program = require('commander');
const {
  promisify
} = require('util');

const {
  readFile,
  writeFile,
  appendFile
} = require('fs');
const TODO_FILE = 'todo.json';


const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);
const appendFileWithPromise = promisify(appendFile);


program
  .version('0.1.0')
  .option('-a, --add', 'Add TODO')
  .option('-l, --list', 'List TODOs')
  .option('-r, --remove', 'Remove specific TODO')
  .option('-d, --reset', 'Remove All TODOs')
  .option('-u, --update', 'Update specific TODO')
  .parse(process.argv);

async function main() {
  const [, , cmd, ...args] = process.argv;

  if (program.add) {
    const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
    const todos = JSON.parse(data);
    const newTodo = args.join(' ');
    todos.push(newTodo);
    console.log(newTodo);
    await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));

  }
  if (program.list) {
    const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
    const todos = JSON.parse(data);
    console.info(todos);
  }
  if (program.remove) {
    const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
    const todos = JSON.parse(data);
    const index = args - 1;
    const result = todos[index];

    if (index <= todos.length - 1 && index > -1) {
      todos.splice(index, 1);
      await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
      console.info(result + ' : has been REMOVED!!!');
      if (todos.length === 0) {
        console.info('TODOS is EMPTY NOW!!!');
      }

    } else {
      console.info('The TODO-ITEM is not exist!!');
    }
  }

  if (program.reset) {
    await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
    console.info('ToDo\'s is EMPTY now!!!');
  }

  if (program.update) {
    const [, , cmd, index, itemToUpdated, ...args] = process.argv;
    const data = await readFileWithPromise(TODO_FILE, 'utf-8').catch(() => '[]');
    const todos = JSON.parse(data);
    const indexTodo = parseInt(index)
    const arrTodo = [];
    arrTodo.push(todos);
    let sizeOfTodos = Object.keys(todos).length;

    if ((typeof indexTodo === 'number' && !isNaN(indexTodo))) {

      if (indexTodo <= 0 || indexTodo > sizeOfTodos) {

        console.info('The TODO-ITEM is not exist...!\nYou must enter index between 1 and ' + sizeOfTodos);

      } else {
        arrTodo[0].splice(indexTodo - 1, 1, itemToUpdated);
        let newTodo = arrTodo[0];
        await writeFileWithPromise(TODO_FILE, JSON.stringify(newTodo));
        const result = 'index ' + index + ' has been UPDATED by: ' + newTodo[indexTodo - 1];
        console.info(result);

      }
    } else {
      console.info('Your index is not a number, YOU MUST ENTER a number !');
    }
  }

}
main();