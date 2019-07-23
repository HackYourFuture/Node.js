const read = require('./read');
const write = require('./write');

function deleteOne(req, res, toDelete) {
  read().then(parsedData => {
    parsedData.map((toDo, index) => {
      if (toDo.id === toDelete) {
        parsedData.splice(index, 1);
        const list = JSON.stringify(parsedData, null, 2);
        write(req, res, list).then(Response => {
          res.send('the line has been deleted.');
        });
      }
 else {
        console.log('Nothing has been deleted.');
      }
    });
  });
}

module.exports = deleteOne;
