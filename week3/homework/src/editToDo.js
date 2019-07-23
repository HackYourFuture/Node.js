const read = require('./read');
const write = require('./write');

function editToDo(req, res, toEdit, toDoId) {
  read().then(parsedData => {
    parsedData.find(toDo => {
      if (toDo.id === toDoId) {
        toDo.description = toEdit;
        const list = JSON.stringify(parsedData, null, 2);
        write(req, res, list).then(Response => {
          res.send('todo has been edited to ' + toEdit);
        });
      }
    });
  });
}

module.exports = editToDo;
