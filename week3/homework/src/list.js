const fs = require('fs');
const desc = 'LIST: shows the toDoList';
function list(todoText) {
  try {
    const data = fs.readFileSync('todos.json', 'utf8');
    const parsedData = JSON.parse(data);
    let list = '';
    parsedData.forEach(element => {
      const prop = parsedData.indexOf(element);
      list = list + element.text + `\n`;
    });
    return list;
  } catch (err) {
    console.log(err.message);
  }
}
module.exports = { list, desc };
