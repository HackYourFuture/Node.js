'use strict';

const express = require('express');
const router = require('./todo');
const app = express();
app.use(express.json());
app.use('/todos', router);
app.listen(3000, (req, res) => {
  console.log('port started on 3000');
});
