var fs = require('fs');

var options = process.argv.slice(2);
var command = options[0];

switch (command) {
  case 'help':
  default:
    showHelp();
    break;
  case 'list':
    listTodos();
    break;
  case 'remove':
    RemoveTodos();
    break;
  case 'add':
    var args = options.slice(1);
    addItem(args);
    break;
  case 'reset':
   resetTodos();
   break;
}

function splitStringByNewline(string) {
  return string.split('\r\n').filter((element) => {
    element = element.trim();
    return element.length > 0;
  });
}

function showHelp() {
  openFile('help.txt', (error, data) => {
    if (error) {
      return console.log('Error: the help file could not be displayed', error);
    }
    console.log(data);
  });
}

function listTodos() {
  getTodosFromFile((todos) => {

    if (todos.length === 0) {
      return console.log('Nothing to do!')
    }

    console.log('Your todo list looks like this');
    todos.forEach(function(element, index) {
      index = (index + 1).toString();
      console.log(index, element);
    });

    if (todos.length > 5) {
      console.log('You have too much to do!');
    }
  });
}

function addItem(args) {
  getTodosFromFile((todos) => {
    // 1) check todo's length
    if (todos.length > 5) {
      return console.log('Cannot add another item, you have too much to do already!');
    }

    // 2) create string from arguments
    var newItemString = "";
    args.forEach((element, index) => {
      newItemString += element;

      // if last argument, do not add whitespace
      if (index != args.length - 1) {
        newItemString += " ";
      }
    });
    newItemString.trim()
    todos.push(newItemString);

    // 3) add to todo list
    var newFileContents = "";
    todos.forEach((element, index) => {
      newFileContents += element + "\r\n";
    });

    // 4) write back to file
    writeToFile('todo.txt', newFileContents, (error, data) => {
      if (error) {
        return console.log('Error saving file');
      }

      console.log("Added \"" + newItemString + "\" as item #" + todos.length + " to list");
    });
  });
}

function RemoveTodos() {
 var lineno = process.argv.slice(3)[0];

 fs.readFile('todo.txt', function read(err, data) {
   if (err) {
     throw err;
   }

   lineno = lineno - 1
   var data_array = String(data).split("\r\n");
   if (lineno > data_array.length) {
     return console.log("That item is not in the list...");
   }
   var item = data_array.splice(lineno, 1);

   var new_data = String(data).replace(item + '\r\n', "");

   fs.writeFile('todo.txt', new_data, function(err, data) {
     if (err) {
       throw err;
     }
   });

   console.log('the line has been removed');
 });
}

function resetTodos(){
  fs.writeFile('todo.txt', '', function read(err, data) {
      if (err) {
        throw err;
      }
    });
  console.log('the file has been reseted')
}

// File I/O

function getTodosFromFile(callback) {
  openFile('todo.txt', (error, data) => {
    if (error) {
      if (error.code === 'ENOENT') {
        return console.log('Nothing to do! (or your dog ate your todo list)');
      } else {
        return console.log('Error: Something went wrong', error);
      }
    }

    var todos = splitStringByNewline(data);
    callback(todos);
  });
}

function openFile(fileName, callback) {
  fs.readFile(__dirname + '/' + fileName, 'utf8', (error, data) => {
    callback(error, data)
  });
}

function writeToFile(fileName, contents, callback) {
  fs.writeFile(__dirname + '/' + fileName, contents, (error) => {
    callback(error)
  });
}
