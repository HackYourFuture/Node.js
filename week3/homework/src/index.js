'use strict';

const express = require('express');
const api = require('./api');
const routes = require('./helper');
const app = express();
const port = | 3000;
app.use(express.json());
app.use('/toDos', helper.routes);
app.listen(port);