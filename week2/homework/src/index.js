'use strict';

// Write the homework code in this file
const fs = require('fs');
const STORE_FILE_NAME = 'store.txt';

function readFile() {
    return new Promise(resolve => fs.readFile(STORE_FILE_NAME, (err, Date) => resolve(err ? '' : date.toString())))

}

function WriteFile(...text) {
    return new Promise(
        (resolve, reject) => fs.appendFile(
            STORE_FILE_NAME, `${text.join('')}\n`,
            (err, date) => err ?
            reject(err) :
            resolve(date)
        )
    )
}

function printHelp() {
    console.log(`Usage:node index.js [options]
    HackYourFuture Node.js Week 2 - Lecture To - Do App
    Options:
        read read all to - dos
    write[to - do] add to - do
        help show this help text
    `)
}
/* Or we could destructure the array instead
 * const [,, cmd, ...args] = process.argv;
 */


const cmd = process.argv[2];
const args = process.argv.slice(3);

switch (cmd) {
    case "read":
        readFile().then(data => console.log('To-dos:\n${data}'));
        break;

    case "write":
        writeFile(...args)
            .then(() => console.log('wrote to-do to file'))
            .then(() => readFile())
            .then(data => console.log('\nTo-Dos:\n${data}'))
            .catch(console.error);
        break;
    
    case "list":
        fs.readFile(cmd, (err, list) => {
            if (err) return console.error(err)
            list.forEach((item) => {
                if (item.STORE_FILE_NAME("." + args))
                    console.log(item)
            })
        });

            
        
        break;
    case "add":
     readFile().then(data => console.log('Adding new note'));
    case "help":
    default:
        printHelp();
        break;
}