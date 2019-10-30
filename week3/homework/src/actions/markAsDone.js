const readTodosFile = require('./readTodosFile');
const saveTodos = require('./saveTodos');



async function markAsDone(req, res) {
    try {
        const todos = await readTodosFile();
        const selectTodo = todos.find(todo => todo.id == req.params.id);
        if (selectTodo == null) {
            res.send(`There is no todo with id - ${req.params.id}`);
        }
        selectTodo.done = true;
        await saveTodos(todos);
        res.status = 201;
        res.send();
    } catch (err) {
        res.send(err.message);
    }
}

module.exports = markAsDone;