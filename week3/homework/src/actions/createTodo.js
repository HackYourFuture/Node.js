const uuidv4 = require('uuid/v4');
const validTodo = require('./validTodo');
const saveTodos = require('./saveTodos');
const readTodosFile = require('./readTodosFile');

async function createTodo(req, res) {
    try {
        const todo = validTodo(req);
        const todos = await readTodosFile();
        todo.id = uuidv4();
        todos.push(todo);
        todo.done = false;
        await saveTodos(todos);
        res.status = 201;
        res.send();
    } catch (err) {
        res.send(err.message);
    }
}

module.exports = createTodo;