'use strict';

// Write the homework code in this file
const fs = require('fs');
const STORE_FILE_NAME = 'store.txt';
const TO_DO = "toDo.txt";
const ADD = "add.txt";
const HELP = "help.txt";

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
                if (item.TO_DO("." + args))
                    console.log(item)
            })
        });


        break;
    case "add":
        fs.appendFile(ADD, "UFT-8", (err, data) => {
            let addToDo = data + args + "" + "\n";
            fs.writeFile(ADD, addToDo, (err, data) => {
                if (err) console.log("error");
                fs.readFile(ADD, "UFT-8", (err, data) => {
                    console.log(data);
                });

            });
        });
        break;
    case "remove":
        let remove = (args) - 1;
        fs.readFile(TO_DO, "UFT-8", (err, data) => {
            if (err) console.log("error");
            let dat = msContentScript.split("\n");
            dat.splice(remove, 1);
            let un_writ = dat.join("\n");
            console.log(un_writ);
            fs.writeFile(TO_DO, un_writ);
        });

        break;
    case "reset":
        let resetFactory = "";
        fs.writeFileSync(TO_DO, resetFactory);
        fs.readFile(TO_DO, "UTF-8", (err, data) => {
            if (err) console.log("error");
            console.log(data);
        });
        break;
    case "help":
        fs.appendFile(HELP, "UTF-8", (err, data) => {
            if (err) console.log("error");
            else {
                console.log(data);
            }
        });
    default:
        printHelp();
        break;
}