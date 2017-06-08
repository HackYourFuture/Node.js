
var fs = require('fs'),
   command = process.argv[2];
switch (command) {
  case 'list':
    listTodos();
    break;
  case 'add':
    addContent();
    break;
  case 'reset':
    reset();
    break;
    case 'update':
    update();
    break;
  case 'remove':
    remove();
    break;
  case 'help':
  default:
    showHelp();
    break;
}

function splitStringByNewline(string) {
  return string.split('\r\n').filter(function(element) {
    element = element.trim();
    return element.length > 0;
  });
}

// add to todo.txt
function addContent() {
  var x = process.argv.slice(3);
  if (!/[^\s]+/.test(x)) { // checking if the the user type an empty input
    console.log("Invalid input. Please try again by typing item number. ");
  }
  else{
      fs.appendFile('./todo.txt', ` \r\n${x.join(' ')}`, (err) => {
      if (err) throw err;
      console.log('The data is appended');
    
      });
  }
}

function showHelp() {
  openFile('help.txt', function(error, data) {
    if (error) {
      return console.log('Error: the help file could not be displayed', error);
    }
    console.log(data);
  });
}

function listTodos() {
  openFile('todo.txt', function(error, data) {
    if (error) {
      if (error.code === 'ENOENT') {
        return console.log('Nothing to do! (or your dog ate your todo list)');
      } else {
        return console.log('Error: Something went wrong', error);
      }
    }


    var todos = splitStringByNewline(data);

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

// remove a content from todo.txt
function remove() {

    var x = process.argv.slice(3),
        itemIndex = x-1;
    openFile('todo.txt', function(error, data) {
      if (error) {
       return console.log('Error: Something went wrong', error);
      }
      var data = data.split('\n');
      var counter = [];
      for (var y = 0 ; y < data.length ; y++){
          counter.push(y);
      }
      if (counter.includes(itemIndex)){
        console.log("item to be deleted is : " + data[itemIndex]);
        data.splice((x-1),1);
        console.log('item has been deleted');
        var todos = data.join('\n');
        fs.writeFile('todo.txt', todos, (err) => {
          if (err) throw err;
        });
      }
      else {
        console.log("todo (" + x + ") doesn't exist");
        }    
    });
}

//updat item 
function update(){
  var oldItem = process.argv[3],
      newItem = process.argv.slice(4).join(' '),
      oldItemIndex = oldItem - 1 ;
  if (!/[^\s]+/.test(newItem)) { // checking if the the user type an empty input
    console.log("Invalid input. Please try again by typing old item number then the new todo . ");
  }
  else {
    openFile('todo.txt', function(error, data) {
      if (error) {
       return console.log('Error: Something went wrong', error);
      }
      var data = data.split('\n'),
          counter = [];
      for (var y = 0 ; y < data.length ; y++){
          counter.push(y);
      }
      if (counter.includes(oldItemIndex)){
        console.log("item to be updated is : " + data[oldItemIndex]);
        data[oldItemIndex] = newItem
        console.log('item has been updated');
        var todos = data.join('\n');
        fs.writeFile('todo.txt', todos, (err) => {
          if (err) throw err;
        });
      }
      else {
        console.log("Invalid input or todo (" + oldItem + ") doesn't exist");
        }    
    });
  }
}

// Reset todo.txt
function reset() {
  fs.truncate('./todo.txt', 0, () => console.log('Todo is clean now'));
} 

function openFile(fileName, callback) {
  fs.readFile(__dirname + '/' + fileName, 'utf8', function(error, data) {
    callback(error, data)
  });
}