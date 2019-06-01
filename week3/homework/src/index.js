'use strict';

const express = require('express');
const router = express.Router();
const main = require('./main');
const app = express();

app.use(express.json());

app.use('/todos', router);

app.listen(3020, () => console.log(`I am listening to http://localhost:3020`));

router.get('/', main);
router.get('/:id', main);
router.post('/', main);
router.post('/:id/:done', main);
router.delete('/:id/:done', main);
router.put('/:id', main);
router.delete('/:id', main);
router.delete('/', main);
