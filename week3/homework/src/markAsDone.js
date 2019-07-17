const fs = require('fs');
function done(id) {
  const data = fs.readFileSync('todos.json', 'utf8');
  const parsedData = JSON.parse(data);
  parsedData[id - 1].isDone = true;
  fs.writeFileSync('todos.json', JSON.stringify(parsedData));
  return `'${parsedData[id - 1].text}'`;
}

module.exports = { done };
