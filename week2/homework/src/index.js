
const fs = require('fs');
let command = process.argv[2];
let value = process.argv[3];
let listFile = fs.readFileSync('./list.json', 'utf8');
let listArr = JSON.parse(listFile);

switch (command) {
  case 'list':
    ViewTasks();
    break;
  case 'add':
    AddTask();
    break;
  case 'help':
  case undefined:
    let helpFile = fs.readFileSync('./help.txt', 'utf8');
    console.log(helpFile);
    break;
  case 'remove':
    RemoveTask(value);
    break;
  case 'reset':
    ClearTasks();

  case 'update':
    UpdateTasks(value, process.argv[4]);
    break;

  default:
    console.log('wrong command check the help menu by typing help');
}

function ViewTasks() {
  if (listArr) {
    listArr.forEach(element => { console.log(element) });
  }
  else {
    console.log('no toDos sorted');
  }
}

function AddTask() {
  if (process.argv.length < 4) {
    console.log('incomplete command check the help menu by typing help');
  }
  else {
    let taskLine = '';
    for (let i = 3; i <= process.argv.length - 1; i++) { taskLine += process.argv[i] + ' '; }
    listArr.push(taskLine);
    fs.writeFile('./list.json', JSON.stringify(listArr, null, 2), (err) => { if (err) throw err; });
  }
}

function RemoveTask(i) {
  if (i > listArr.length) {
    console.log('not existed task check the help menu by typing help');
  }
  else if (process.argv.length < 4) {
    console.log('incomplete command check the help menu by typing help');
  }
  else {
    listArr.splice(i - 1, 1);
    fs.writeFile('./list.json', JSON.stringify(listArr), (err) => { if (err) throw err; });
  }
}

function ClearTasks() {
  fs.writeFile('./list.json', JSON.stringify(listArr = '[]'), (err) => { if (err) throw err; });
}

function UpdateTasks(i, newTask) {
  if (i > listArr.length) {
    console.log('not existed task check the help menu by typing help');
  }
  else if (process.argv.length < 5) {
    console.log('incomplete command check the help menu by typing help');
  }
  listArr.splice(i - 1, 1, newTask);
  fs.writeFile('./list.json', JSON.stringify(listArr), (err) => { if (err) throw err; });
}


