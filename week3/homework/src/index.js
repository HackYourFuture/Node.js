'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

function readToDo(request, response) {
  fs.readFile('./todos.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      response.status(500).send('Problem Occurred.');
    } else {
      const index = request.params.id - 1;
      const parsedData = JSON.parse(data);
      if (index > Object.keys(parsedData).length || index < 0) {
        console.log('Not valid');
      } else {
        response.json(JSON.parse(data)[index]);
        console.log(data);
      }
    }
  });
}

function clearToDos(response) {
  fs.truncate('./todos.json', 0, (error, data) => {
    if (error) {
      console.log(error);
      response.status(500).send('Problem Occurred.');
    } else {
      console.log('Todo list cleared.');
      response.json();
    }
  });
}

function markAsDoneOrNotDone(request, response, boolean) {
  fs.readFile('./todos.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      response.status(500).send('Problem Occurred.');
    } else {
      const index = request.params.id - 1;
      const finalData = JSON.parse(data);

      if (index > Object.keys(finalData).length || index < 0) {
        console.log('Not valid');
      } else {
        finalData[index].done = boolean;

        fs.writeFile('./todos.json', JSON.stringify(finalData), error => {
          if (error) {
            console.log(error);
            response.status(500).send('Problem occurred while writing data.');
          } else {
            console.log('Status of todo item changed.');
            response.json(finalData);
          }
        });
      }
    }
  });
}

app.use(bodyParser.json());

app.get('/todos/:id', (request, response) => {
  readToDo(request, response);
});

app.delete('/todos/', response => {
  clearToDos(response);
});

app.post('/todos/:id/done', (request, response) => {
  markAsDoneOrNotDone(request, response, true);
});

app.delete('/todos/:id/done', (request, response) => {
  markAsDoneOrNotDone(request, response, false);
});

app.listen(3000);
