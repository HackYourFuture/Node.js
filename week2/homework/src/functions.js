const fs = require('fs');
const argument = process.argv[3];
let argumentExtra = process.argv[4];
const argumentExtra_ = process.argv[5];
const data = require('./index');
const path = './to-dos.txt';
const fileName = 'to-dos.txt';

function help() {
  if (argument) {
    console.log(
      '-help- command needs no argument! \n' +
        'help: Lists all the commands and a short description for each of them.',
    );
  } else {
    const descriptions =
      '\nCommands:\n\n' +
      'help: Lists all the commands and a short description for each of them.\n' +
      'list: Shows current to-dos, or shows an appropriate text if there are no to-dos.\n' +
      'add [to-do item]: Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.\n' +
      'remove [index-number]: Removes a to-do item by its 1-base index.\n' +
      'reset: Removes all to-do items from the list.\n' +
      'update [index-number] [to-do item]: Updates a to-do item with new text.';
    console.log(descriptions);
  }
}

function list() {
  if (argument) {
    console.log(
      '-list- command needs no argument! \n' +
        'list: Shows current to-dos, or shows an appropriate text if there are no to-dos.',
    );
  } else {
    if (fs.existsSync(path)) {
      const toDos = fs.readFileSync(fileName, 'utf8');
      console.log(toDos);
    } else {
      console.log('Have not added to-do item to list yet!');
    }
  }
}

function add() {
  if (argumentExtra) {
    console.log(
      '-add- command needs no more than one argument! \n' +
        'add [to-do item]: Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.',
    );
  } else {
    if (argument === undefined) {
      console.log(
        '-add- command needs to-do item as an argument! \n' +
          'add [to-do item]: Adds a to-do item. All the words behind add are entered as 1 to-do item to the list.',
      );
    } else {
      fs.appendFileSync(fileName, argument + '\n');
      console.log('to-do item - ' + argument + ' - has been added to the list!');
    }
  }
}

function remove() {
  if (argumentExtra) {
    console.log(
      '-remove- command needs no more than one argument! \n' +
        'remove [index-number]: Removes a to-do item by its 1-base index.',
    );
  } else {
    if (Math.sign(Number(argument)) === 1 && Number.isInteger(Number(argument))) {
      const data = fs.readFileSync(fileName, 'utf8');
      let splitArray = data.split('\n');
      const lineNum = splitArray.length;
      if (argument >= lineNum) {
        console.log('There is no line ' + argument + ' in the to-do list!');
      } else {
        splitArray.splice(argument - 1, 1);
        let result = splitArray.join('\n');
        fs.writeFileSync(fileName, result);
        console.log('to-do item - ' + argument + ' - has been removed from the list!');
      }
    } else {
      console.log(
        '-remove- command needs positive integer number as an argument! \n' +
          'remove [index-number]: Removes a to-do item by its 1-base index.',
      );
    }
  }
}

function reset() {
  if (argument) {
    console.log(
      '-reset- command needs no argument! \n' + 'reset: Removes all to-do items from the list.',
    );
  } else {
    fs.writeFileSync(fileName, '');
    console.log('all to-do items has been removed from the list!');
  }
}

function update() {
  if (argumentExtra_) {
    console.log(
      '-updated- command needs no more than two argument! \n' +
        'update [index-number] [to-do item]: Updates a to-do item with new text.',
    );
  } else {
    if (Math.sign(Number(argument)) === 1 && Number.isInteger(Number(argument))) {
      const data = fs.readFileSync(fileName, 'utf8');
      let splitArray = data.split('\n');
      const lineNum = splitArray.length;
      if (argument >= lineNum) {
        console.log('There is no line ' + argument + ' in the to-do list!');
      } else {
        splitArray.splice(argument - 1, 1, argumentExtra);
        let result = splitArray.join('\n');
        fs.writeFileSync(fileName, result);
        if (argumentExtra === undefined) {
          argumentExtra = '';
        }
        console.log(
          'to-do item in the line - ' +
            argument +
            ' - in the list has been updated to - ' +
            argumentExtra +
            ' -.',
        );
      }
    } else {
      console.log(
        '-update- command needs positive integer number for first an argument! \n' +
          'update [index-number] [to-do item]: Updates a to-do item with new text.',
      );
    }
  }
}

module.exports = { help, list, add, reset, remove, update };
