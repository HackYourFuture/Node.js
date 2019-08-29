const fs = require('fs');
module.exports = () => {
  const content = fs.readFileSync('./todo-list.json');
  const data = JSON.parse(content);
  data.ToDos.length = 0;
  const list = JSON.stringify(data);
  fs.writeFileSync('./todo-list.json', list);
}