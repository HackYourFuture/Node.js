const write = require('./write');
const read = require('./read');

function markDone(req, res, id) {
  read().then(parsedData => {
    parsedData.find(toDo => {
      if (toDo.id === id) {
        toDo.done = !toDo.done;
        const list = JSON.stringify(parsedData, null, 2);
        write(req, res, list).then(Response => {
          res.send('todo has been updated.');
        });
      }
    });
  });
}

module.exports = markDone;
