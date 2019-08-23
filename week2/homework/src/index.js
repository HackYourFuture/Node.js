'use strict';
const chalk = require('chalk')
const args = process.argv
const commands = ['new', 'get', 'remove', 'reset', 'help'];

const rl = require('readline');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ todos: []}).write()


// usage represents the help guide
const usage = function() {
  const usageText = `
  todo helps you manage you todo tasks.

  usage:
    todo <command>

    commands can be:

    new:      used to create a new todo
    get:      used to retrieve your todos
    remove:   used to delete a todo 
    reset:    used to remove all items in the list
    help:     used to print the usage guide
  `

  console.log(usageText)
}

// used to log errors to the console in red color
function errorLog(error) {
  const eLog = chalk.red(error)
  console.log(eLog)
}

// we make sure the length of the arguments is exactly three
if (args.length > 3 && args[2] != 'remove') {
  errorLog(`only one argument can be accepted`)
  usage()
  return
}

if (commands.indexOf(args[2]) == -1) {
    errorLog('invalid command passed')
    usage()
  }

switch(args[2]) {
    case 'help':
      usage()
      break
    case 'new':
        newTodo();
      break
    case 'get':
        getTodos()
      break
    case 'remove':
        removeTodo()
      break
    case 'reset':
        removeAllTodos()
    break
    default:
      errorLog('invalid command passed')
      usage()
  }


function prompt(question) {
    const r = rl.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    return new Promise((resolve, error) => {
      r.question(question, answer => {
        r.close()
        resolve(answer)
      });
    })
  }

  function newTodo() {
    const q = chalk.blue('Type in your todo\n')
    prompt(q).then(todo => {
        // add todo
        db.get('todos').push({title: todo, delete: false}).write()
    //   console.log(todo)
    })
  }

  function getTodos() {
    const todos = db.get('todos').value()
    let index = 1;
    todos.forEach(todo => {
        if(!todo.delete){
            let todoText = `${index++}. ${todo.title}`;
        
            console.log(chalk.green(todoText));
    }
    })
    return
  }

  function removeTodo() {
    // check that length
    if (args.length != 4) {
      errorLog("invalid number of arguments passed for complete command")
      return
    }
  
    let n = Number(args[3])
    // check if the value is a number
    if (isNaN(n)) {
      errorLog("please provide a valid number for complete command")
      return
    }
  
    // check if correct length of values has been passed
    let todosLength = db.get('todos').value().length
    if (n > todosLength) {
      errorLog("invalid number passed for complete command.")
      return
    }
  
    // update the todo item 
    db.set(`todos[${n-1}].delete`, true).write()
  }

  function removeAllTodos(){
    
    let todosLength = db.get('todos').value().length;
    let i = 0;
    for(i; i<todosLength; i++){
      db.set(`todos[${i}].delete`, true).write()
    }
   
    
   
}


   

