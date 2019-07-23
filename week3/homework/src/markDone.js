const write = require('./write');
const read = require('./read');

function markDone(req, res, toDelete) {
  read().then(parsedData => {
    parsedData.map((toDo, index) => {
      if (toDo.id === req.query.id) {
        if (toDo.done !== true) {
          toDo.done = true;
          const listDone = JSON.stringify(parsedData, null, 2);
          write(req, res, listDone).then(Response => {
            res.send('todo has been done.');
          });
        }
 else {
          toDo.done = false;
          const listDone = JSON.stringify(parsedData, null, 2);
          write(req, res, listDone).then(Response => {
            res.send('todo has been not done yet!');
          });
        }
      }
    });
  });
}

module.exports = markDone;
