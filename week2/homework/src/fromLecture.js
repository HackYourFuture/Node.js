'use strict';

const { appendFile, readFile, writeFile } = require('fs');
const { promisify } = require('util');

// readFile('some-file.txt', 'utf8', (err, data) => {
//   if (err)
//     return console.error(err);

//   console.info(data);
// });

// function readFileWithPromise(path, encoding) {
//   return new Promise((resolve, reject) => {
//     readFile(path, encoding, (err, data) => {
//       if (err)
//         return reject(err);

//       return resolve(data);
//     });
//   });
// }

const appendFileWithPromise = promisify(appendFile);
const readFileWithPromise = promisify(readFile);
const writeFileWithPromise = promisify(writeFile);

// const PATH = 'some-file.txt';

// async function main() {
//   const cat = {
//     name: 'Long cat',
//     age:  5
//   };

//   await writeFileWithPromise(PATH, JSON.stringify(cat));

//   // await appendFileWithPromise(PATH, 'Some other content\n');
//   // await appendFileWithPromise(PATH, 'Some other content\n');
//   // await appendFileWithPromise(PATH, 'Some other content\n');
//   // await appendFileWithPromise(PATH, 'Some other content\n');
//   // await appendFileWithPromise(PATH, 'Some other content\n');
//   // await appendFileWithPromise(PATH, 'Some other content\n');

//   const data = await readFileWithPromise(PATH, 'utf8').catch(console.error);

//   const parsed = JSON.parse(data);

//   console.info(parsed);
// }

// main();

const TODO_FILE = 'todo.json';

async function main() {
  const [, , cmd, ...args] = process.argv;

  switch (cmd) {
    case 'add': {
      const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      const newTodo = args.join(' ');
      todos.push(newTodo);
      await writeFileWithPromise(TODO_FILE, JSON.stringify(todos));
      break;
    }
    case 'list': {
      const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      console.info(todos);
      break;
    }
    case 'reset': {
      await writeFileWithPromise(TODO_FILE, JSON.stringify([]));
      const data = await readFileWithPromise(TODO_FILE, 'utf8').catch(() => '[]');
      const todos = JSON.parse(data);
      console.info('To-dos:', todos);
      break;
    }
    case 'remove':
      break;
    case 'help':
    default:
      console.info('Some help');
      break;
  }
}

main();