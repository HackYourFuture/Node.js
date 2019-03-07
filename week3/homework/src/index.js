'use strict';

const express = require('express');
const api = require('./api');
const routes = require('./routes');
const app = express();
app.use(express.json());
app.use('/todos', routes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Todo app started on port ${port}...`));
