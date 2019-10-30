const readTodosFile = require('./readTodosFile');



async function readTodo(req, res) {
    try {
        const todos = await readTodosFile();
        const todo = todos.find(todo => todo.id == req.params.id);
        if (todo == null) {
            res.send(`There is no todo with id - ${req.params.id}`);
        }else{
            res.send(todos);
        }
    } catch (err) {
        res.send(err.message);
    }
}

module.exports = readTodo;
