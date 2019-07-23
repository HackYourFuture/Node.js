const read = require('./read');
const uuidv4 = require('uuid/v4');
const write = require('./write');

function addOne(req, res, toWrite) {
  read().then(parsedData => {
    const toDoItem = {
      id: uuidv4(),
      description: toWrite,
      done: false
    };
    parsedData.push(toDoItem);
    const jsonData = JSON.stringify(parsedData, null, 2);
    write(req, res, jsonData).then(Response => {
      res.send('added new item todo.');
    });
  });
}

module.exports = addOne;
