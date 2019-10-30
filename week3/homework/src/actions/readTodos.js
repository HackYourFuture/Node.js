const readTodosFile = require('./readTodosFile');


async function readTodos(req, res) {
    try {
        const todos = await readTodosFile();
        if (todos == 0) {
            res.send('There is no todo in the list.');
        }else{
            res.send(todos);
        }
    } catch (err) {
        res.send(err.message);
    }
}

module.exports = readTodos;