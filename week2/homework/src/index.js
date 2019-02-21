'use strict'
const fs = require('fs');
const command = process.argv[2];
const toDo = process.argv[3];



switch (command) {
  case 'list':
    list();
    break;
  case 'add':
    add(toDo);
    break;
  case 'remove':
    removing(toDo);
    break;
  case 'reset':
    removing(0, 1);
    break;
  case 'help':
  default:
    help();
}


function list() {
  fs.readFile('./toDo.txt', 'utf8', function (error, data) {
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  })
}


function add(item) {

  fs.appendFileSync('./toDo.txt', item + '\n', function (error) {
    if (error) { console.log(error) }
  })


}
function removing(index, reset) {
  fs.readFile('toDo.txt', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
    }
    else {
      let corrected = data.split('\n');
      corrected.splice(index - 1, true);
      corrected = corrected.join('\n');
      if (reset) {
        corrected = "";
      } fs.writeFile('toDo.txt', corrected, function () {
        if (error) {
          console.log(error);
        }
      });
    }
  })
}


function help() {
  console.log(`Here you can find some help `)
}



