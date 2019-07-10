const fs = require('fs');

function reset() {
  fs.writeFile('./src/data.json', '', error => {
    if (error) throw error;
    console.log(`todoText list removed successfully`);
  });
}

module.exports = reset;
