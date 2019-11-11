const express = require("express");
const books = require("./books");

let app = express();

app.use(express.json());

app.get   ( "/books"     , books.readAll  );
app.get   ( "/books/:id" , books.readOne  );
app.post  ( "/books"     , books.create   );
app.put   ( "/books/:id" , books.update   );
app.delete( "/books/:id" , books.delete   );

app.listen(3000);


