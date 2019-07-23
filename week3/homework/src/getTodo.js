const read = require('./read');

function getToDo(req, res, toDoId) {
  read().then(parsedData => {
    parsedData.find(toDo => {
      if (toDo.id === toDoId) {
        res.send(toDo);
      }
    });
  });
}

module.exports = getToDo;
