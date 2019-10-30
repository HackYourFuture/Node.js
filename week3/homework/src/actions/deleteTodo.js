const readTodosFile = require('./readTodosFile');
const saveTodos = require('./saveTodos');


async function deleteTodo(req, res) {
    try {
        const todos = await readTodosFile();
        const todo = todos.find(todo => todo.id == req.params.id);
        if (todo == null) {
            res.send(`There is no todo id - ${req.params.id}`);
        }
        const deleteByIndex = todos.indexOf(todo);
        todos.splice(deleteByIndex, 1);
        await saveTodos(todos);
        res.status = 200;
        res.send();
    } catch (err) {
        res.send(err.message);
    }
}

module.exports = deleteTodo;