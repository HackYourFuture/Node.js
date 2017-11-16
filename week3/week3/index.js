const express = require('express');
const fs = require('fs');

const app = express();


const list = require("./actions/list.js")
app.get('/', list);


const add = require("./actions/add.js")
app.post('/', add);

const remove = require("./actions/remove.js")
app.delete('/delete/:id', remove);

const update = require("./actions/update.js")
app.put('/update/:id', update);

app.listen(3000);

