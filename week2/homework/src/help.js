const fs = require('fs');

const commands = {
  help: 'Lists all the commands and a short description for each of them',
  list: 'Shows current to-dos',
  add: 'Adds a to-do item to the list',
  remove: 'Removes a to-do item by its 1-base index',
  reset: 'Removes all to-do items from the list',
};

function help() {
  return console.log(commands);
}
module.exports = help;
