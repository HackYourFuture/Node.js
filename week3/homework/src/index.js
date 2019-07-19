const express = require('express');
const app = express();
const myFunctions = require('./myFunctions.js');
const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
app.use((request, response, next) => {
  response.setHeader('Content-Type', 'application/json');
  next();
});

//Getting toDoThing with a specific id
app.get('/todos/:id', (request, response) => {
  myFunctions.readToDo(request, response);
});

//Adding new toDoThing
app.post('/todos', (request, response) => {
  myFunctions.createToDo(request, response);
});

//Deleting toDoThing
app.delete('/todos/:id', (request, response) => {
  myFunctions.deleteToDo(request, response);
});

//Clearing All ToDos
app.delete('/todos', (request, response) => {
  myFunctions.clearToDos(response);
});

//Marking Done As True
app.post('/todos/:id/done', (request, response) => {
  myFunctions.markAsDoneOrMarkAsNotDone(request, response, true);
});

//Marking Done As False
app.delete('/todos/:id/done', (request, response) => {
  myFunctions.markAsDoneOrMarkAsNotDone(request, response, false);
});

app.listen(3000);
console.log('Port Number: 3000 is listening.');
