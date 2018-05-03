'use strict';

const fs = require('fs');

let fileName = 'toDo.json';
// console.log(fileName);
function readFile() {
    return new Promise(
        resolve => fs.readFile(
            fileName,
            (err, data) => resolve(err ? '' : data.toString())
        )
    );
}

function remove() {
    readFile()
        .then(content => {
            let newArray = content.split('\n');
            let i = newArray.length-1
            newArray.splice(i, 1);
           let new2 =  newArray.join('\n')    
            writeFile(new2);
            console.log(content);
        })
}

function writeFile(...text) {
    return new Promise(
        (resolve, reject) => fs.appendFile(
            fileName,
            `${text.join(' ')}\n`,
            (err, data) => err
                ? reject(err)
                : resolve(data)
        )
    );
}

const cmd = process.argv[2];
const args = process.argv.slice(3);
const removeArgs = args[0];

switch (cmd) {
  case "add":
    writeFile(...args)
      .then(() => console.log("wrote to-do to file"))
      .then(() => readFile())
      .then(data => console.log(`to-doS:\n ${data}`))
      .catch(console.error);
    break;
  case "list":
    readFile(fileName).then(content => {
      console.log("toDoS:\n", content.toString());
    });
    break;
  case "remove":
    remove(removeArgs);
    break;
  case "reset":
        fs.writeFile(fileName, '', console.log('all toDo items are removed!'));
        break;
  default: "help"
    fs.readFile("help.txt", "utf8", function(err, data) {
      console.log(data);
    });
    break;
}
