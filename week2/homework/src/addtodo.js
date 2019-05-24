const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function addToList(...command) {
  let list = await readFile('todolist.json', 'utf8');
  list = JSON.parse(list);
  list.push(`\n${command.join(' ')}`);
  return writeFile('todolist.json', JSON.stringify(list), 'utf8');
}
module.exports = addToList;
