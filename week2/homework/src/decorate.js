const data = require('./data');

const decorateData = element =>
  data.to_dos.forEach(element => {
    console.log("my task is:" + element);
  });

module.exports = decorateData;