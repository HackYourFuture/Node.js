const fs = require('fs');

const list = function () {
  fs.readFile('toDoList.json', 'utf8', function (err, fileContent) {
    if (err) {
      console.log('Error!', err);
    } else if (fileContent.length <= 0) {
      console.log('Nothing to do!');
    } else {
      const toDoList = fileContent.split();
      console.log(`You're To-Do's are : ` + `${toDoList} `);

    }
  })

}

module.exports = list;