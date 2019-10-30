const readTodosFile = require('./readTodosFile');
const saveTodos = require('./saveTodos');


async function markAsNotDone(req, res) {
    try {
        const todos = await readTodosFile();
        const selectTodo = todos.find(todo => todo.id == req.params.id);
        if (selectTodo == null) {
            res.send(`There is no todo id - ${req.params.id}`);
        }
        selectTodo.done = false;
        await saveTodos(todos);
        res.status = 200;
        res.send();
    } catch (err) {
        res.send(err.message);
    }
}

module.exports = markAsNotDone;