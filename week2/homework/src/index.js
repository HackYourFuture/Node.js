('use strict');

const { readFile, writeFile, unlink } = require('fs');
const { promisify } = require('util');
const chalk = require('chalk');
const boxt = require('boxt'); // module for terminal customization

const readFilePromisified = promisify(readFile);
const writeFilePromisified = promisify(writeFile);
const unlinkPromisified = promisify(unlink);

const args = process.argv.slice(2);
const cmd = args[0];

const TODOS_PATH = 'todo.json';

function readJSON() {
  return readFilePromisified(TODOS_PATH, 'utf8')
    .then(JSON.parse)
    .catch(() => []);
}

function storeTodos(todos) {
  return writeFilePromisified(TODOS_PATH, JSON.stringify(todos, null, 2));
}

function resetTodos() {
  return unlinkPromisified(TODOS_PATH).catch(() => {
    console.log('no todos to reset, you might want to **add** one first');
    console.log(helpMessages.help);
  });
}

const helpMessages = {
  add: 'use: node . add "something to do"',
  remove: 'use: node . remove <index>',
  list: 'use: node . list',
  done: 'use: node . done <index>',
  update: 'use: node . update <index> "something to do instead"',
  reset: 'use: node . reset',

  help: boxt(
    `${chalk.cyan('>>')} Available commands:
node . add 'something to do'
${chalk.inverse.green('Adds a todo to your todo list.')}
node . remove <index>
${chalk.inverse.green('Removes a todo, specified by the index.')}
node . list
${chalk.inverse.green('Lists all todos.')}
node . done <index>
${chalk.inverse.green('Marks a todo as done, specified by the index.')}
node . update <index> 'new todo'
${chalk.inverse.green(
      'Replaces a todo specified by the index withe a new todo.'
    )}
node . reset
${chalk.inverse.green('Resets the todos file.')}
node . OR node . help
${chalk.inverse.green('Shows the available commands (this).')}`,
    {
      theme: 'round',
      color: 'green',
      align: 'left'
    }
  )
};

async function main() {
  const userIndexInput = parseInt(args[1]);
  const allTodos = await readJSON();

  function addTodo() {
    const userTodoInput = args[1];
    if (userTodoInput === undefined) {
      console.log(
        chalk.red('Error while adding a todo, see this:\n'),
        helpMessages.add
      );
    } else {
      allTodos.push({
        task: userTodoInput,
        done: 'not done'
      });
      storeTodos(allTodos);
      console.log(`added todo: '${chalk.cyan(args[1])}'`);
    }
  }

  function removeTodo() {
    if (userIndexInput >= allTodos.length) {
      console.log(`${chalk.red("didn't find a todo with that index")}`);
      console.log(helpMessages.remove);
    }
    allTodos.forEach((todo, index) => {
      if (userIndexInput === index) {
        allTodos.pop(index);
        storeTodos(allTodos);
        console.log(`successfully removed '${chalk.cyan(todo.task)}'`);
      }
    });
  }

  function listTodos() {
    if (allTodos.length === 0) {
      console.log('no todos yet, start by adding one');
      console.log(helpMessages.add);
    } else {
      console.log('your todos are:');
      allTodos.forEach((todo, index) => {
        console.log(
          `  ${chalk.cyan(index)}- ${todo.task} ${
            todo.done === 'done'
              ? chalk.green.bold(todo.done)
              : chalk.magenta.bold(todo.done)
          }`
        );
      });
    }
  }

  function markTodoAsDone() {
    allTodos.forEach((todo, index) => {
      if (index === userIndexInput) {
        if (todo.done === 'done') {
          console.log(
            `${chalk.inverse(`you've already marked '${todo.task}' as done`)}`
          );
        } else {
          todo.done = 'done';
          console.log(`Successfully marked '${chalk.cyan(todo.task)}' as done`);
          storeTodos(allTodos);
        }
      }
    });
    if (userIndexInput >= allTodos.length) {
      console.log(`${chalk.red("didn't find a todo with that index")}`);
    }
  }

  function updateTodo() {
    allTodos.forEach((todo, index) => {
      if (index === userIndexInput) {
        const oldTodo = todo.task;
        console.log(
          `updated '${chalk.red(oldTodo)}' with '${chalk.cyan(args[2])}'`
        );
        allTodos[index].task = args[2];
        allTodos[index].done = 'not done';
        storeTodos(allTodos);
      }
    });
    if (userIndexInput >= allTodos.length) {
      console.log(`${chalk.red("didn't find a todo with that index")}`);
    }
  }

  switch (cmd) {
    case 'add':
      addTodo();
      break;
    case 'remove':
      removeTodo();
      break;
    case 'list':
      listTodos();
      break;
    case 'done':
      markTodoAsDone();
      break;
    case 'update':
      updateTodo();
      break;
    case 'reset':
      resetTodos();
      break;
    case 'help':
      console.log(helpMessages.help);
      break;
    default:
      console.log(helpMessages.help);
  }
}
main();
