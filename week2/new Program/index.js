"use strict"
/****  it's a program that do the following:
These are the specs for this week's assignment:
  - The user can run a NodeJs to-do app
  - The user can be able to run the file using node index.js
  - There should be a "help" section that lists all the commands for how to use the app

The following commands should be present:
  - No command: show help section (node index.js)
  - help: show help section (node index.js help)
  - list: show current todo's, or show an appropriate text if there are no todos (node index.js list)
  - add: add a todo item. all the words behind "add" are entered as 1 todo item to the list (node index.js add "Buy groceries")
  - remove: remove a todo item by its 1-base index. (node index.js remove 2)
  - reset: remove all todo items from the list (node index.js reset)
  - BONUS: update: update a todo item with new text (node index.js update 3 "Wash teeth")
*/
const fs = require("fs")
const REQUIRE_ARGS = process.argv.slice(2)
const firstInputCommand = REQUIRE_ARGS[0]
const FILE_NAME = process.env.todosFileName || "todos.txt"

function filesReader(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (e, data) => {
      if (e) {
        reject(e)
      }
      resolve(data)
    }) // FS.readFile()
  }) // new Promise
} // filesReader()

function filesWriter(path, newData, oldData) {
  return new Promise((resolve, reject) => {
    
    let dataHolder = []
    if (!oldData && newData || !newData && !oldData) {
      dataHolder.push(newData)
    } else {
      dataHolder.push(oldData, newData)
    }
    
    fs.writeFile(path, dataHolder.join("\n"), (e) => {
      if (e) {
        reject(e)
      }
      resolve(dataHolder)
    })
  })
}

function readingError(e) {
  // this Function is if anything went wrong during the reading mode
  //   it have to show us the message that explain the error.
  //   And if the error was "File not found" it will create it automaticly
  if (e.code === "ENOENT") {
    filesWriter(FILE_NAME).catch(e => { console.error(e) })
    return
  } else {
    console.error("something went wrong")
    console.error(e)
  }
}

switch (firstInputCommand) {
  case "list":
    filesReader(FILE_NAME).then(data => { console.log(data) }).catch(readingError)
    break
  case "add":
    filesReader(FILE_NAME).then(data => {
      filesWriter(FILE_NAME, REQUIRE_ARGS[1], data)
        .catch(e => {
          console.error(e)
        }) // .catch()
    }).catch(readingError) // filesReader()
    break
  case "reset":
    filesReader(FILE_NAME).then(data => {
      filesWriter(FILE_NAME)
        .catch(e => {
          console.error(e)
        }) // .catch()
    }).catch(readingError) // filesReader()
    break
  case "remove":
  case "update":
    filesReader(FILE_NAME).then(data => {
      let dataHolder = data.split("\n")
      if (REQUIRE_ARGS[2]) {
        dataHolder.splice(REQUIRE_ARGS[1] - 1, 1, REQUIRE_ARGS[2])
      } else {
        dataHolder.splice(REQUIRE_ARGS[1] - 1, 1)
      }
      filesWriter(FILE_NAME, dataHolder.join("\n"))
        .catch(e => {
          console.error(e)
        }) // .catch()
    }).catch(readingError) // filesReader()
    break
  default:
    if (!process.env.todosFileName || firstInputCommand === "help") {
      filesReader("./help.txt").then(data => { console.log(data) }).catch(e => { console.error(e) })
    } else if (process.env.todosFileName) {
      filesReader(FILE_NAME).catch(readingError)
    }
}
