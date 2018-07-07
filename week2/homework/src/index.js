'use strict';

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
    console.log(helpMessages.add);
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

  switch (cmd) {
    case 'add':
      addTodo(allTodos);
      break;
    case 'remove':
      removeTodo(userIndexInput, allTodos);
      break;
    case 'list':
      listTodos(allTodos);
      break;
    case 'done':
      markTodoAsDone(userIndexInput, allTodos);
      break;
    case 'update':
      updateTodo(userIndexInput, allTodos);
      break;
    case 'reset':
      resetTodos();
      break;
    case 'help':
    default:
      console.log(helpMessages.help);
  }
}
main();

function addTodo(allTodos) {
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

function removeTodo(userIndexInput, allTodos) {
  if (userIndexInput > allTodos.length || userIndexInput < 1) {
    console.log(`${chalk.red("didn't find a todo with that index")}`);
    listTodos(allTodos);
  } else {
    const oldTodo = allTodos[userIndexInput - 1].task;
    allTodos.splice(userIndexInput - 1, 1);
    console.log(`successfully removed '${chalk.cyan(oldTodo)}'`);
    storeTodos(allTodos);
  }
}

function listTodos(allTodos) {
  if (allTodos.length === 0) {
    console.log('no todos yet, start by adding one');
    console.log(helpMessages.add);
  } else {
    console.log('your todos are:');
    allTodos.forEach((todo, index) => {
      console.log(
        `  ${chalk.cyan(index + 1)}- ${todo.task} ${
          todo.done === 'done'
            ? chalk.green.bold(todo.done)
            : chalk.magenta.bold(todo.done)
        }`
      );
    });
  }
}

function markTodoAsDone(userIndexInput, allTodos) {
  if (userIndexInput > allTodos.length || userIndexInput < 1) {
    console.log(`${chalk.red("didn't find a todo with that index")}`);
    listTodos(allTodos);
  } else {
    const userDoneInput = allTodos[userIndexInput - 1];
    if (userDoneInput.done === 'done') {
      console.log(
        `${chalk.inverse(
          `you've already marked '${userDoneInput.task}' as done`
        )}`
      );
    } else {
      userDoneInput.done = 'done';
      console.log(
        `Successfully marked '${chalk.cyan(userDoneInput.task)}' as done`
      );
      storeTodos(allTodos);
    }
  }
}

function updateTodo(userIndexInput, allTodos) {
  if (userIndexInput > allTodos.length || userIndexInput < 1) {
    console.log(`${chalk.red("didn't find a todo with that index")}`);
    listTodos(allTodos);
  } else {
    const oldTodo = allTodos[userIndexInput - 1].task;
    const newTodo = allTodos[userIndexInput - 1];
    newTodo.task = args[2];
    newTodo.done = 'not done';
    storeTodos(allTodos);
    console.log(
      `updated '${chalk.red(oldTodo)}' with '${chalk.cyan(args[2])}'`
    );
  }
}

// Why do you iterate over the whole array to update 1 item ? The whole point of an array is that you can access item by index.Also,
// the assignment is to remove and update items using 1 - based index and not zero - based.
