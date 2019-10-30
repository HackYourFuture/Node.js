const saveTodos = require('./saveTodos');

async function clearTodos(req, res) {
    try {
        await saveTodos([]);
        res.status = 200;
        res.send();
    } catch (err) {
        res.send(err.message);
    }
}

module.exports = clearTodos;