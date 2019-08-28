const fs = require('fs');

function remove(todoTask) {
  if (todoTask !== undefined) {
    fs.readFile('./data.txt', 'utf-8', (err, data) => {
      if (err) throw err;

      const newValue = data.replace(todoTask, '');

      fs.writeFile('./data.txt', newValue, 'utf-8', err => {
        if (err) throw err;
        console.log(`${todoTask} removed from the list`);
      });
    });
  } else {
    console.log('Please fill in a legitimate task to remove');
  }
}

function reset(file) {
  fs.writeFile(file, '', 'utf-8', err => {
    if (err) throw err;
    console.log('File is reset');
  });
}

module.exports = { remove, reset };
