const fs = require('fs');
module.exports = (id, value) => {
  const content = fs.readFileSync('./todo-list.json');
  const data = JSON.parse(content);
  if (id > data.ToDos.length || id <= 0) {
    console.log(`no todo item with given id`);
    return;
  }
  const list = data.ToDos.map(element => {
    if (element.id == id) {
      element.todo = value;
    }
    return element;
  })
  data.ToDos = list;
  const json = JSON.stringify(data);

  fs.writeFileSync('./todo-list.json', json);

}