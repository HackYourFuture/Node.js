const fs = require('fs');

module.exports = (newToDo) => {
  const content = fs.readFileSync('./todo-list.json');
  const data = JSON.parse(content);
  let id;
  if (data.ToDos == 0) {
    id = 1
  } else {
    id = data.ToDos.length + 1;
  }
  let todoObject = {
    id: id,
    todo: newToDo
  }
  data.ToDos.push(todoObject);
  const list = JSON.stringify(data);
  fs.writeFileSync('./todo-list.json', list)

}