

'use strict';

// Write the homework code in this file
const fs = require('fs');

const STORE_FILE_NAME = 'store.txt';

function readFile() {
    return new Promise(
        resolve => fs.readFile(STORE_FILE_NAME,
            (err, data) => resolve(err ? '' : data.toString())
        )
    );
}

function writeFile(...text) {
    return new Promise(
        (resolve, reject) => fs.appendFile(
            STORE_FILE_NAME,
            `${text.join(' ')}\n`,
            (err, data) => err
                ? reject(err)
                : resolve(data)
        )
    );
}

function overWriteFile(text) {
    return new Promise((resolve, reject) => {
        fs.writeFile(STORE_FILE_NAME, text,
            (err, data) => err
                ? reject(err)
                : resolve(data))
    })
}
function printHelp() {
    console.log(`Usage: node index.js [options] "Commits"

Jamshid's Node.js Week 2 - Homework To-Do App

Options:

  list          read all to-dos
  add [to-do] add to-do
  help          show this help text
  reset         resets content to empty
  remove [index] removes given index

  `);
}

/* Or we could destructure the array instead
 * const [,, cmd, ...args] = process.argv;
 */
const cmd = process.argv[2];
const args = process.argv.slice(3);

switch (cmd) {
    case 'list':
        readFile()
            .then(data => console.log(`To-Dos:\n${data}`));
        break;

    case 'add':
        writeFile(...args)
            .then(() => console.log('Wrote to-do to file'))
            .then(() => readFile())
            .then(data => console.log(`\nTo-Dos:\n${data}`))
            .catch(console.error);
        break;
    case 'remove':
        readFile(STORE_FILE_NAME)
            .then(content => {
                let subString = content.toString().split('\n')
                let editStrings = subString.splice(args - 1, 1)
                overWriteFile(subString.join('\n'))
                    .then(data => {
                        console.log(`To-Dos: \n${ subString.join('\n') }`)
                    })
                    .catch(console.error);
            })
        break;
    case 'reset':
        overWriteFile('')
            .then(data => {console.log('Your To-do is reseted')})
            .then(() => readFile())
            .then(data => console.log(`\nTo-Dos:\n${data}`))
            .catch(err => console.log(err))
        break;

    case 'help':
    default:
        printHelp();
        break;
}
