const todoActions = require('./todoActions');

class Routes {
  configure(app) {
    app
      .get('/', (req, res) => {
        res.json({ message: 'This is a todo app.' });
      })
      .get('/todos/:id', todoActions.readToDo)
      .get('/todos', todoActions.readToDos)
      .post('/todos', todoActions.createToDo)
      .post('/todos/:id/done', todoActions.markToDo)
      .put('/todos/:id', todoActions.updateTodo)
      .delete('/todos/:id', todoActions.deleteTodo)
      .delete('/todos/:id/done', todoActions.markToDo)
      .delete('/todos/', todoActions.clearAllTodos)
      .use('', todoActions.notFound);
  }
}

const routes = new Routes();
module.exports = routes;
