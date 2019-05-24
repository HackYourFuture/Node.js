const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

async function renderList() {
  let list = await readFile('todolist.json', 'utf8');
  list = JSON.parse(list);
  return console.log(`\n to-do:\n${list}`);
}

module.exports = renderList;
