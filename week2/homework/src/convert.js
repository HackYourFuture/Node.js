const fs = require('fs');

const convertData = data => {
  fs.writeFileSync("./converted-data.json", JSON.stringify(data));
}

module.exports = convertData;