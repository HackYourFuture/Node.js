'use strict';

const express = require('express');
const morgan = require('morgan');
const todos = require('./routes/todos');
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  morgan(
    '[:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms'
  )
);
app.use('/todos', todos);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
