const read = require('./read');

function getList(req, res) {
  read().then(parsedData => {
    res.send(parsedData);
  });
}

module.exports = getList;
