'use strict';

// TODO: Write the homework code in this file
const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());

app.use('/todos', routes);

app.listen(3001, () => console.log(`Todo app started!`));
