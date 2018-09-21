'use strict';
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(bodyParser.json());

app.get('/list', function (request, response) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
      return;
    }
    const myToDoList = JSON.parse(data);
    if (Object.values(myToDoList).length === 0) {
      response.end('You have not any plan in your To Do List');
      return;
    }
    response.json(myToDoList);
  });
});

app.get('/list/:id', function (request, response) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
      return;
    }
    const myToDoList = JSON.parse(data);
    if (Object.values(myToDoList).length === 0) {
      response.end('You have not any plan in your To Do List');
      return;
    }
    const index = request.params.id;
    if (isNaN(index) === true) {
      response.end('You have to enter a number as /list/2');
      return;
    }
    response.json(myToDoList[index]);
    console.log()
  });
});

app.post("/add/:item", function (request, response) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
      return;
    }
    const myToDoList = JSON.parse(data);
    const newToDoItem = {
      'index': myToDoList.length,
      'description': request.params.item
    };
    myToDoList.push(newToDoItem);
    fs.writeFile('./toDo.json', JSON.stringify(myToDoList), function (error) {
      if (error) {
        console.error(error);
      }
    });
    response.json(myToDoList);
  });
});

app.delete('/delete', function (request, response) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
      return;
    }
    const myToDoList = JSON.parse(data);
    if (Object.values(myToDoList).length === 0) {
      response.end('I can not delete an empty list, firsty try to add sth to list.');
      return;
    }
    fs.writeFile('./toDo.json', '[]', function (error) {
      if (error) { console.log(error); }
    });
    response.end("You have cleared all items of to-do list")
  });
});

app.delete('/delete/:item', function (request, response) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
      return;
    }
    const myToDoList = JSON.parse(data);
    if (request.params.item < 0) {
      response.end('The parameter you entered as index is invalid');
      return;
    }
    if (request.params.item > Object.values(myToDoList).length) {
      response.end(`There is not any item in the list in the index of " ${request.params.item} "`)
      return
    }
    myToDoList.splice(request.params.item, 1);
    myToDoList.forEach(function (x) {
      x.index = myToDoList.indexOf(x);
    });
    fs.writeFile('./toDo.json', JSON.stringify(myToDoList), function (error) {
      if (error) { console.log(error); }
    });
    response.end(`You have deleted item " ${request.params.item} " and re-created to-do list`)
  });
});

app.post('/mark/:id/done', function (request, response) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
      return;
    }
    const myToDoList = JSON.parse(data);
    myToDoList[request.params.id].done = "true";
    fs.writeFile('./toDo.json', JSON.stringify(myToDoList), function (error) {
      if (error) { console.log(error); }
    });
    response.end(`You have marked item " ${request.params.id} " as done`)
  });
});

app.delete('/mark/:id/done', function (request, response) {
  fs.readFile('./toDo.json', 'utf8', function (error, data) {
    if (error) {
      console.log(error);
      return;
    }
    const myToDoList = JSON.parse(data);
    delete myToDoList[request.params.id].done;
    fs.writeFile('./toDo.json', JSON.stringify(myToDoList), function (error) {
      if (error) { console.log(error); }
    });
    response.end(`You have deleted done-mark of item " ${request.params.id} "`)
  });
});

app.listen(3000);
console.log("you are listening to PORT : 3000");
