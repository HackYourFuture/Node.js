'use strict';

var fs = require('fs');
var http = require('http');
var options = process.argv.slice(2);

switch (options[0]) {
  case 'help':
    printFile('help.txt');
    break;
  case 'list':
    printFile('todo.txt');
    break;
  case 'add':
    var newLine = options.slice(1)
    add('todo.txt', newLine)
    break;
  case 'remove':
    remove('todo.txt', options[1]);
    break;
  case 'reset':
    reset();
    break;
  case 'update':
    var lineNmber = options[1];
    var newLine = options.slice(2).join(' ');
    update('todo.txt', lineNmber, newLine);
    break;
  default:
    console.log(`\n\n\nyour command was not found:\n\n\n`);
    printFile('help.txt');
}

function printFile(file) {
  try {
    // Attempt to open the file
    const contents = fs.readFileSync(file, 'utf-8');
    console.log(contents);
  } catch (error) {
    switch(error.code) {
    case 'ENOENT':
      console.error(`Error: ${file} not found`);
      break;
    case 'EACCES':
      console.error(`Error: you do not have permission to read ${file}`);
      break;
    default:
      console.error('Unknown error encountered');
      throw(error);
    }
  }
}
function remove(filename, lineNmber){
  lineNmber = Number(lineNmber);
  if(isNaN(lineNmber)){
    console.log(`Please write a line number to be delete`);
  }
  else {
    fs.readFile(filename, 'utf8', function(err, data){
    if (err)
    {
        console.log('the file todo.txt is not found');
    }
    var lines = data.split('\n');
    if (lines.length === 1 && lines[0] === '' ){
      console.log('The file todo.txt is empty so there is no lines to delete');
    }
    else if (lineNmber < 0 || lineNmber-1 >= lines.length){
      console.log(`please write a number between 1 and ${lines.length}`);
    }
    else {
      var removedLine = lines.splice(lineNmber-1,1);
      var text = lines.join('\n');
      fs.writeFileSync(filename, text);
      console.log(`you removed line number ${lineNmber}: ${removedLine}`);
      printFile(filename);

    }
    });
  }
}

function reset(){
  fs.writeFileSync('todo.txt', '');
}

function add(filename, newLine){
  fs.readFile(filename, 'utf8', function(err, data){
    if (err)
    {
        console.log('the file todo.txt is not found');
    }
    var lines = data.split('\n');
    if (lines.length === 1 && lines[0] === '' ){
      fs.writeFileSync(filename, newLine.join(' '));
      printFile(filename);
    }
    else {
      lines.push(newLine.join(' '));
      var text = lines.join('\n');
      fs.writeFileSync(filename, text);
      printFile(filename);
    }

  });
}

function update(filename, lineNmber, newLine){
  lineNmber = Number(lineNmber);
  if(isNaN(lineNmber)){
    console.log(`Please write a line number to be updated`);
  }
  else {
    fs.readFile(filename, 'utf8', function(err, data){
      if (err)
      {
          console.log('the file todo.txt is not found');
      }
      var lines = data.split('\n');
      if(lineNmber-1 < 0 || lineNmber-1 >= lines.length){
        console.log(`please write a number between 1 and ${lines.length}`);
      }
      else {
        lines[lineNmber-1] = newLine;
        var text = lines.join('\n');
        fs.writeFileSync(filename, text);
        printFile(filename);

      }
    });
  }
}
