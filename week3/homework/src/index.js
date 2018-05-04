'use strict';



const {

  findTodo,
  markTodo,
  readTodos,
  writeTodos,
  app,
  uuid

} = require('./functions');

//CREATE TODO
app.post('/todos', async (req, res) => {
  const newTodo = req.body;
  newTodo.id = uuid();
  newTodo.done = false;
  const todos = await readTodos();
  todos.push(newTodo);
  await writeTodos(todos);
  res.json(todos);


});

//READ ALL TODOs
app.get('/todos', async (req, res) => {
  const todos = await readTodos();
  res.json(todos);

});

//READ TODO BY ID
app.get('/todos/:id', async (req, res) => {

  const [, , , todo, ] = await findTodo(req);
  if (typeof todo === 'undefined') {
    return new Error(res.send('NO SUCH ID'));
  } else {
    res.json(todo);
  }
});

//DELETE TODO BY ID
app.delete('/todos/:id', async (req, res) => {

  const [, , ,
    todo,
    todos
  ] = await findTodo(req);
  if (typeof todo === 'undefined') {
    return new Error(res.send('NO SUCH ID'));
  } else {
    todos.splice(todos.indexOf(todo), 1);
    await writeTodos(todos);
  }
  res.json(todos);
});

//DELETE ALL TODOs
app.delete('/todos', async (req, res) => {
  await writeTodos([]);
  res.json([]);

});

//UPDATE TODO BY ID
app.put('/todos/:id', async (req, res) => {

  const [
    id,
    bodyReq,
    done,
    todo,
    todos
  ] = await findTodo(req);
  const newTodo = bodyReq;
  newTodo.id = id;
  if (typeof todo === 'undefined') {
    return new Error(res.send('NO SUCH ID'));
  } else {
    newTodo.done = todo.done;
    todos.splice(todos.indexOf(todo), 1, newTodo);
    await writeTodos(todos);
  }
  res.json(todos);

});

//markAsDone TODO
app.post('/todos/:id/done', async (req, res) => {

  markTodo(req, res, true);
});

//markAsNotDone TODO
app.delete('/todos/:id/done', async (req, res) => {

  markTodo(req, res, false);
});

app.listen(3000, () => {
  console.info('Listening on http://localhost:3000');
});