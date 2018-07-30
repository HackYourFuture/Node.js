'use strict';

// TODO: Write the homework code in this file

const fs = require('fs');

function readFile() {
    return new Promise(
        resolve => fs.readFile(
            "store.json",
            "UTF-8",
            (err, data) => resolve(err ? '' : data)
        )
    );
}

function appendFile(text) {
    fs.readFile("./store.json", "utf-8", (err, data) => {
        if (err) throw err;
        var objectData = JSON.parse(data);
        objectData.tasks.push({ task: text });
        fs.writeFile("./store.json", JSON.stringify(objectData), "utf-8", (err) => { if (err) throw err; })

    })
}

function removeItem(key) {
    fs.readFile("./store.json", "utf-8", (err, data) => {
        if (err) throw err;
        var objectData = JSON.parse(data)
        objectData.tasks.splice(key, 1);
        console.log(objectData);
        fs.writeFile("./store.json", JSON.stringify(objectData), "utf-8", (err) => { if (err) throw err; })

    })
}

function reset() {
    fs.readFile("./store.json", "utf-8", (err, data) => {
        if (err) throw err;
        var objectData = JSON.parse(data)
        objectData.tasks = [];
        console.log(objectData);
        fs.writeFile("./store.json", JSON.stringify(objectData), "utf-8", (err) => { if (err) throw err; })
    })
}


function printHelp() {
    console.log(`Usage: node index.js [options]

HackYourFuture Node.js Week 2 - Sam Homework To-Do App

Options:

  list              list all to-dos
  add [to-do]       add to-do
  remove [index]    Removes the specified to-do item
  reset             Deletes all the todos
  help              show this help text
  `);
}


const cmd = process.argv[2];
const args = process.argv.slice(3);


switch (cmd) {
    case 'list':
        readFile()
            .then(data => console.log(`To-Dos:\n${data}`));
        break;

    case 'add':
        appendFile(args)
        break;

    case 'remove':
        removeItem(args)
        break;

    case 'reset':
        reset();
        break;

    case 'help':
    default:
        printHelp();
        break;
}
