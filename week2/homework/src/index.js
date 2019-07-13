'use strict';
const add = require('./add');
const readFile = require('./readFile');
const writeToFile = require('./writeToFile');
const displayList = require('./displayList');
const update = require('./update');
const remove = require('./remove');
const args = process.argv.slice(3);
const command = process.argv[2];
switch (command) {
  case 'help':
  default:
    console.log(
      '\x1b[33m%s\x1b[0m ',
      '\n\ncommands\n\n' +
        '\thelp\t: shows commands\n\n' +
        '\tlist\t: shows list of TODOS\n\n' +
        '\tremove\t: removes TODO based on index\n\n' +
        '\tupdate\t: updates TODO based on index\n\n' +
        '\treset\t: deletes all TODOs from the list\n\n' +
        '\tadd\t: adds new TODO to TODO list\n\n',
    );

    break;
  case 'add':
    (async () => {
      try {
        const data = await readFile();
        const dataAddedArgs = await add(data, args);
        await writeToFile(dataAddedArgs);
        displayList();
      } catch (error) {
        console.error;
      }
    })();
    break;

  case 'update':
    (async () => {
      try {
        const updatedData = await update(args);
        await writeToFile(updatedData);
        displayList();
      } catch (error) {
        console.error;
      }
    })();

    break;

  case 'list':
    displayList().catch(error => console.log(error));
    break;
  case 'remove':
    (async () => {
      try {
        const data = await readFile();
        const removedData = await remove(data, args);
        await writeToFile(removedData);
        displayList();
      } catch (error) {
        console.error;
      }
    })();
    break;
  case 'reset':
    (async () => {
      try {
        await writeToFile('{}');
        console.log('\x1b[33m%s\x1b[0m ', 'All TODOS deleted');
      } catch (error) {
        console.error;
      }
    })();
    break;
}
