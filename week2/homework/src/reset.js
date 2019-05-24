const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function reset(index) {
  let list = await readFile('todolist.json', 'utf8');
  list = [];
  return writeFile('todolist.json', JSON.stringify(list), 'utf8');
}

module.exports = reset;
