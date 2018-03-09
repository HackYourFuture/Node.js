'use strict';

const fs = require('fs');

let fileName = 'toDo.txt';
// console.log(fileName);
function readFile() {
    return new Promise(
        resolve => fs.readFile(
            fileName,
            (err, data) => resolve(err ? '' : data.toString())
        )
    );
}

function remove(...i) {
    readFile()
        .then(content => {
             content.splice(i, i+1);
        writeFile(content)    
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

switch (cmd) {
  case "help":
    fs.readFile("help.txt", "utf8", function(err, data) {
      console.log(data);
    });
    break;
  case "add":
        writeFile(...args)
            .then(() => console.log('wrote to-do to file'))
            .then(() => readFile())
            .then(data => console.log(`to-doS:\n ${data}`))
            .catch(console.error);
        break;
    case "read":
        readFile()
            .then(data => console.log(`to-doS:\n ${data}`));
        break;
    case "list":
        readFile(fileName).then(content => {
            console.log('toDoS:\n', content.toString());
        });
        break;
    case "remove":
        remove(args - 1);
        break;

  default:
    break;
}
