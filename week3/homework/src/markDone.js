const write = require('./write');
const read = require('./read');

function markDone(req, res, id) {
  read().then(parsedData => {
    let toDo = parsedData.find(toDo => toDo.id === id);
    if (typeof toDo === 'undefined') {
      throw new Error('no toDo found for id: ' + id);
    }
    toDo.done = !toDo.done;
    const list = JSON.stringify(parsedData, null, 2);
    write(req, res, list).then(Response => {
      res.send('todo has been updated.');
    });
  });
}

module.exports = markDone;
