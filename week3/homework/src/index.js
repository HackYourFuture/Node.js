'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;
app.use(bodyParser.json());
const uuid = require('uuid/v4');

app.get('/todos', (request, response) => {
  fs.readFile('todo.json', 'utf-8', (error, data) => {
    const jsonData = JSON.parse(data);
    if (error) {
      console.log(error);
    }
    if (Object.values(jsonData).length === 0) {
      response.send("You don't have any task in your todo list");
      return;
    }
    response.send(jsonData);
  });
});

app.get('/todos/:id', (request, response) => {
  fs.readFile('todo.json', 'utf-8', (error, data) => {
    if (error) {
      console.log(error);
    }
    const jsonData = JSON.parse(data);
    const id = Number(request.params.id);
    response.send(jsonData[id]);
  });
});

app.delete('/todos', (request, response) => {
  fs.readFile('todo.json', 'utf-8', (error, data) => {
    if (error) {
      console.log(error);
    }
    const jsonData = JSON.parse(data);
    if (Object.values(jsonData).length === 0) {
      response.send(`Your list is already empty, please add more tasks!`);
      return;
    }
    fs.writeFile('todo.json', '[]', error => {
      if (error) {
        console.log(error);
      }
    });
    response.send(`All the tasks are successfully cleared`);
  });
});

app.post('/todos/:item', (request, response) => {
  fs.readFile('todo.json', 'utf-8', (error, data) => {
    if (error) {
      console.log(error);
    }
    const jsonData = JSON.parse(data);
    const newData = {
      task: request.params.item,
    };
    jsonData.push(newData);
    fs.writeFile('todo.json', JSON.stringify(jsonData), error => {
      if (error) {
        console.log(error);
      }
    });
    response.send(jsonData);
  });
});

app.delete('/todos/:id', (request, response) => {
  fs.readFile('todo.json', 'utf-8', (error, data) => {
    if (JSON.parse(data).length === 0) {
      response.send(`Your list is already empty`);
    }
    if (error) {
      console.log(error);
    }
    const jsonData = JSON.parse(data);
    let id = Number(request.params.id);
    jsonData.splice(id, 1);
    console.log(jsonData);
    fs.writeFile('todo.json', JSON.stringify(jsonData), error => {
      if (error) {
        console.log(error);
      }
    });
    response.send(`The task: ${id} is successfully deleted`);
  });
});

app.post('/todos/:id/done', (request, response) => {
  fs.readFile('todo.json', 'utf-8', (error, data) => {
    if (error) {
      console.log(error);
    }
    const jsonData = JSON.parse(data);
    let id = Number(request.params.id);
    jsonData[id].done = 'true';
    fs.writeFile('todo.json', JSON.stringify(jsonData), error => {
      if (error) {
        console.log(error);
      }
    });
    response.send(`The item ${id} is marked as done`);
  });
});

app.delete('/todos/:id/done', (request, response) => {
  fs.readFile('todo.json', 'utf-8', (error, data) => {
    if (error) {
      console.log(error);
    }
    const jsonData = JSON.parse(data);
    let id = Number(request.params.id);
    jsonData[id].done = false;
    fs.writeFile('todo.json', JSON.stringify(jsonData), error => {
      if (error) {
        console.log(error);
      }
    });
    response.send(`The item ${id} is marked as false`);
  });
});

app.listen(port, () => console.log(`The app is listening to the port ${port}! =)`));
