import fs from 'fs';
const argumentArray = process.argv;
const command = process.argv[2];
const argument = process.argv[3];
switch (command) {
  case "help":
  case undefined:
    fs.readFile('help.txt', 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
    break;
  case "add":
    fs.appendFile('todoList.txt', "\n" + argument, (err) => {
      if (err) throw err;
      console.log('The task is added successfully');
    });
    break;
    case "remove":
    fs.readFile('todoList.txt', 'utf8', (err, data) => {
      if (err) throw err;
      const dataToArray = data.split("\n");
      dataToArray.splice(argument, 1);
      const newTxt = dataToArray.join('\r\n');
      fs.writeFile('todoList.txt', newTxt, (err) => {
        if (err) throw err;
        console.log('The task is removed successfully');
      });
    });
    break;
    case "reset":
    fs.writeFile('todoList.txt', " ", (err) => {
      if (err) throw err;
      console.log('All tasks are cleared');
    });
    case "list":
    fs.readFile('todoList.txt', 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
};