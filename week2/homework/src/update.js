const fs = require('fs');

function update(index, updatedText) {
  fs.readFile('./src/data.json', 'utf8', (error, data) => {
    if (error) throw error;
    if (Number.isInteger(Number(index)) && index > 0) {
      const array = data.split('\n');
      const updatedItem = array[index - 1];
      array.splice(index - 1, 1, updatedText);
      const updatedData = array.join('\n');
      fs.writeFile('./src/data.json', updatedData, error => {
        if (error) throw error;
        console.log(`${updatedItem} updated with the ${updatedText}`);
      });
    } else {
      console.log(`The index should be an integer`);
    }
  });
}

module.exports = update;
