'use strict';

// TODO: Write the homework code in this file
const {
  appendFile,
  readFile,
  writeFile
} = require('fs');
const {
  promisify
} = require('util');
const appendFileWithPromise = promisify(appendFile);
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);
const TODO_FILE = 'todo.json';
const program = require('commander');

async function list(cmd) {
  const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
  let toDos = JSON.parse(data);
  console.info(toDos);
}
program
  .command('list')
  .action(list)
program
  .command('add <item>')
  .action(async function (item, cmd) {
    const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
    let toDos = JSON.parse(data);
    toDos.push(item);
    console.info(toDos);
    await writeFileWithPromise(TODO_FILE, JSON.stringify(toDos));
  })
program
  .command('update <item> <newText>')
  .action(async function (value, newText) {
    const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
    let toDos = JSON.parse(data);
    if (value <= toDos.length && value > +0) {
      const removedItem = toDos[value - 1];
      toDos.splice(value - 1, 1, newText);
      await writeFileWithPromise(TODO_FILE, JSON.stringify(toDos));
      console.info(removedItem + ' : is modified to ' + newText);
      if (toDos.length === 0)
        console.info('ToDos is EMPTY NOW!!!');
    } else {
      console.log('Item number is out of range ');
    }
  })
program
  .command('remove <item>')
  .action(async function (value) {
    const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
    let toDos = JSON.parse(data);
    if (value <= toDos.length && value > +0) {
      const removedItem = toDos[value - 1];
      toDos.splice(value - 1, 1);
      await writeFileWithPromise(TODO_FILE, JSON.stringify(toDos));
      console.info(removedItem + ' :  is  Removed from your TO-DO list!');
      if (toDos.length === 0)
        console.info('ToDos is EMPTY NOW!!!');
    } else {
      console.log('Item number is out of range ');
    }
  })

program
  .command('reset ')
  .action(async function () {
    const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
    await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
    let toDos = JSON.parse(data);
    console.info('To-dos:', toDos);
  })

program
  .command('help ')
  .action(async function () {
    console.info('!!-- Some help --!!',
      'List :Shows current to-dos list',
      'add : Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.',
      'remove: Removes a to-do item by its 1-base index, e.g. to remove second item',
      'reset: Removes all to-do items from the list');
  })
program.parse(process.args)