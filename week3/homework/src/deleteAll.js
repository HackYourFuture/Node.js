const write = require('./write');

function deleteAll(req, res) {
  write(req, res, []).then(Response => {
    res.send('Every thing have been deleted.');
  });
}

module.exports = deleteAll;
