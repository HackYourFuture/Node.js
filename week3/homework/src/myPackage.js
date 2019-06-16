const fs = require("fs");
const bodyParser = require("body-parser");

function readToDo(request, response) {
  fs.readFile("./todos.json", "utf8", (error, todoList) => {
    if (error) {
      console.log(error);
      response.status(500).send("some problem.");
    } else {
      const index = request.params.id;
      response.json(JSON.parse(todoList)[index - 1]);
      console.log(todoList);
    }
  });
}

function clearToDos(response) {
  fs.truncate("./todos.json", 0, (error, todoList) => {
    if (error) {
      console.log(error);
      response.status(500).send("Problem Occured.");
    } else {
      console.log("Todo list cleared.");
      response.json();
    }
  });
}

function markAsDoneOrNotDone(request, response, boolean) {
  fs.readFile("./todos.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
      response.status(500).send("some problem.");
    } else {
      const index = request.params.id;
      const newData = JSON.parse(data);
      if (index > Object.keys(newData).length || index<=0) {
        console.log("Wrong ID given.")
        
      } else{
        newData[index - 1].done = boolean;
      }
      

      fs.writeFile("./todos.json", JSON.stringify(newData), error => {
        if (error) {
          console.log(error);
          response.status(500).send("problem occured while writing data.");
        } else {
          console.log("Status of todo item changed.");
          response.json(newData);
        }
      });
    }
  });
}

module.exports = {readToDo, clearToDos, markAsDoneOrNotDone}
