const express = require('express');
const app = express();
const actions = require("./actions.js");
var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/todos', (request, response) => {
    actions.list(response);
});
app.delete('/todos/:id', (request, response) => {
    let key = request.params.id;
	actions.remove(response , key);
});
app.post('/todos', (request, response) => {
    let todo = request.body.todo;
	let desc = todo.description;
	actions.create(response , desc);
});
app.put('/todos/:id', (request, response) => {
    let key = request.params.id;
	let todo = request.body.todo;
	let desc = todo.description;
	actions.update(response , key ,desc);
});


app.listen(3000, function() {
    console.log(`The nodejs server is now listening on 3000`);
});

