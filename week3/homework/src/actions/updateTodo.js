const validTodo = require('./validTodo');
const readTodosFile = require('./readTodosFile');
const  saveTodos = require('./saveTodos')

async function updateTodo(req, res) {
    try {
        const updateTodo = validTodo(req);
        const todos = await readTodosFile();
        const oldTodo = todos.find(todo => todo.id == req.params.id);
        if (oldTodo == null) {
            res.send(`There is no todo id - ${req.params.id}`);
        }
        oldTodo.description = updateTodo.description;
        await saveTodos(todos);
        res.status = 201;
        res.send();
    } catch (err) {
        res.send(err.message);
    }
}

module.exports = updateTodo;