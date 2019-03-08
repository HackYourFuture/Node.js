'use strict';

const express = require('express');

const app = express();
app.use(express.json());
const api = require('./api.js');
const routes = require('./routes');
app.use(express.static('static'));

app.get('/', (req, resp) => resp.json(api.get()));

app.use('/todos', routes);

app.listen(3001, () => console.log(`Todo app started!`));
