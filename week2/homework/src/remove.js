const fs = require('fs');
//  get

module.exports = (id) => {
  const num = parseInt(id);
  const content = fs.readFileSync('./todo-list.json');
  const data = JSON.parse(content);
  if (data.ToDos.length === 0 || num <= 0 || num > data.ToDos.length) {
    console.log(`no todo item with id ${num}`);
    return;
  }
  data.ToDos.splice(num - 1, 1);
  const list = data.ToDos.map((element, index) => {
    element.id = index + 1;
  })
  const json = JSON.stringify(data);
  fs.writeFileSync('./todo-list.json', json)

}