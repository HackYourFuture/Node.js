const fs = require('fs');
function undone(id) {
  const data = fs.readFileSync('todos.json', 'utf8');
  const parsedData = JSON.parse(data);
  delete parsedData[id - 1]['isDone'];
  fs.writeFileSync('todos.json', JSON.stringify(parsedData));
  return `'${parsedData[id - 1].text}'`;
}

module.exports = { undone };
