'use strict';

// TODO: Write the homework code in this file
const program = require('commander');
const {readToDos} = require('./readtodos.js');
const {writeToDos} = require('./writetodos.js');
const {resetToDos} = require('./resettodos.js');

const args = process.argv.slice(2);
const cmd = args[0];

program
  .version('0.1.0')
  .parse(process.argv);
// interface is not complete yet

async function app() {
  const toDos = await readToDos();
  switch (cmd) {
    case 'list':
      readToDos().then(console.log);
      break;

    case 'add':
      const task = args[1];
      toDos.push({
        task,
        done: false
      });
      await writeToDos(toDos);
      const newToDos = await readToDos();
      console.log(newToDos);
      break;

    case 'remove':
      const toRemoveTaskIndex = Number(args[1]) - 1;
      if (toRemoveTaskIndex >= 0 && toRemoveTaskIndex < toDos.length) {
        toDos.splice(toRemoveTaskIndex, 1);
        await writeToDos(toDos);
        const remainingToDos = await readToDos();
        console.log(remainingToDos);
      }
      else {
        console.log(`Not a valid entry, to check the list type 'list'`);
      }
      break;

    case 'reset':
      resetToDos();
      break;

    case 'done':
      const doneIndex = Number(args[1]) - 1;
      if (doneIndex >= 0 && doneIndex < toDos.length) {
        const status = args[2];
        const statusValue = (status === 'true');
        toDos[doneIndex]['done'] = statusValue;
        await writeToDos(toDos);
        const upToDateToDos = await readToDos();
        console.log(upToDateToDos);
      }
      else {
        console.log(`Not a valid entry, to check the list type 'list'`);
      }
      break;

    case 'update':
      const toUpdateIndex = Number(args[1]) - 1;
      if (toUpdateIndex >= 0 && toUpdateIndex < toDos.length) {
        const newTaskText = args[2];
        toDos[toUpdateIndex]['task'] = newTaskText;
        await writeToDos(toDos);
        const updatedToDos = await readToDos();
        console.log(updatedToDos);
      }
      else {
        console.log(`Not a valid entry, to check the list type 'list'`);
      }
      break;

    default:
      console.log(`- To see the list of toDos type 'list' after running the program with 'node .'
- To add a task to the list type 'add' followed by the text of the task wrapped between quotations ''
- To remove a task from the list type 'remove' followed by the number of the task you want to remove
- To mark a task as done type 'done' followed by the number of the task you want to mark and the word 'true' or type 'false' to reset the achievement status to 'not done'
- To reset the list type 'reset'
- To update the text of a task type 'update' followed by the number of the task you want to update and the new text wrapped between quotations ''
- If you need help just ask! `);
      break;
  }
}

app();
