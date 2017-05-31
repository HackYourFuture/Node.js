var fs = require('fs');

var options = process.argv.slice(2);

var command = options[0];


switch (command) {
  case 'help':
    help();
    break;
  case 'list':
    listTodos();
    break;
  case 'add':
    add()
    break;
  case 'remove':
    remove()
    break;
  case 'reset':
    reset()
    break;
  case 'update':
    update()
    break;
  default:
    showHelp();
}

function help() {
  console.log(`
options :
1- help : show help section.
2- add : add a todo item.
3- list: show current todo's, or show an appropriate text if there are no todos.
4- remove: remove a todo item by its 1-base myapp.js.
5- reset: remove all todo items from the list.
`);
};

//find number after instruction
function num() {
  let number = parseInt(options[1])

  //avoid type anything but numbers
  if ((typeof number === 'number' && !isNaN(number))) {
    return number

  } else if (options[1] == null) {
    console.log(`type a number after ${options[0]}`);
    return;
  } else {
    console.log('use only numbers');
    return
  }
}

function splitStringByNewline(string) {
  return string.split('\n').filter(function(element) {
    element = element.trim();
    return element.length > 0;
  });
}


//show help section
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

//add items to todo list
function add() {
  //check if something typed after add
  if (options[1] == null) {
    console.log(`type somthing after add `);
    return;
  }
  let item = options.map(i => {
    //the command(add) not to be included
    if (i !== command)
      return i
  }).join(' ').trim()
  fs.appendFile('todo.txt', `\r\n${item}`, (err) => {
    if (err) throw err;
    console.log(`${item} was appended to file!`);
  });
}


//remove items from todo list
function remove() {
  fs.readFile('todo.txt', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    //parse string to number
    let number = parseInt(options[1])
    let lines = splitStringByNewline(data);
    //avoid type anything but numbers
    if ((typeof number === 'number' && !isNaN(number))) {
      // number has not to be greater than list number
      if (number > lines.length) {
        console.log(`there is ${lines.length} lines in this file choose between 0 and ${lines.length} `);
      }
      //after remove should not be empty
    } else if (options[1] == null) {
      console.log(`type a number after remove `);
      return;
    } else {
      console.log('use only numbers');
      return
    }
    lines.splice(number - 1, 1);
    let joinedLines = lines.join('\n').trim();
    fs.writeFile('todo.txt', joinedLines);

  });
}


//remove all todo items from the list
function reset() {

  fs.truncate('todo.txt', 0, function() {
    console.log('"todo" list is empty now!!')
  })
}

//update a todo item with new text
function update() {
  fs.readFile('todo.txt', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    todo = splitStringByNewline(data)
    let number = num()
    todo[number - 1] = options[2]
    let joinedLines = todo.join('\r\n').trim();
    fs.writeFile('todo.txt', joinedLines);
  })
}

function openFile(fileName, callback) {
  fs.readFile(__dirname + '/' + fileName, 'utf8', function(error, data) {
    callback(error, data)
  });
}
