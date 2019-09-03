const fs = require('fs');

function checkIfExists(task) {
  const textByLine = fs
    .readFileSync('data.txt')
    .toString()
    .split('\n');

  const exists = textByLine.filter(word => word === task);
  if (exists == task) return true;
  else console.log('The task you entered does not exist');
}

function remove(todoTask) {
  if (todoTask !== undefined && checkIfExists(todoTask) == true) {
    fs.readFile('./data.txt', 'utf-8', (err, data) => {
      if (err) throw Error('File cannot be read');

      const newValue = data.replace(todoTask, '');

      fs.writeFile('./data.txt', newValue, 'utf-8', err => {
        if (err) throw Error('File cannot be written');
        else console.log(`${todoTask} is removed from the list`);
      });
    });
  } else {
    console.log('Please fill in a legitimate task to remove');
  }
}

function reset(file) {
  fs.writeFile(file, '', 'utf-8', err => {
    if (err) throw Error;
    console.log('File is reset');
  });
}

module.exports = { remove, reset };
