const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const functionality = require('./functionality');

app.use(bodyParser.json());

app.get('/list', (request, response) => {
  console.log(request.body);
  response.send(functionality.todoList());
});

app.post('/todos', (request, response) => {
  console.log(request.body);
  functionality.add(request.body.todo.description);
  response.send('ok');
});

app.delete('/delete/:id', (request, response) => {
  console.log(request.body);
  let id = Number(request.params.id);
  functionality.remove(id);
  response.send('ok');
});

app.put('/todos/:id/:item', (request, response) => {
  console.log(request.body);
  let id = Number(request.params.id);
  let newData = {
    task: request.params.item,
  };
  functionality.update(id, newData);
  response.send('ok');
});

app.listen(port, () => console.log(`The app is listening to the port ${port}!`));
