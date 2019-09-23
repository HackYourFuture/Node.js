const generateUUID = require('uuid/v4');

let books = [{
  id    : "9a2cd641-3bc5-4334-9813-926543e08426",
  title : "The White Castle",
  author: "Orhan Pamuk"
}, {
  id    : "43ffdd99-b1c9-42c2-9edd-7e3fff9fbca9",
  title : "The Ministrs of Utmost Happiness",
  author: "Arundhati Roy"
}];

exports.readAll = function (req, res) {
  res.status(200).json(books).end();
}

exports.readOne = function (req, res) {
  let book = books.find(book => book.id == req.id);
  if ( books ) {
    res.status(200).json(books).end();
  }
  else {
    res.status(400).end('no such book');
  }
}

exports.create = function (req, res) {
  let newBook = req.body;
  if ( isValid(newBook) ) {
    newBook.id = generateUUID();
    books.push(newBook);
    res.status(201).end(newBook.id);
  }
  else {
    res.status(400).end('Invalid book');
  }
}

exports.update = function (req, res) {
  let updatedBook = req.body;
  if ( isValid(updatedBook) ) {
    let existingBook = books.find(book => book.id == req.params.id);
    if ( ! existingBook ) {
      res.status(400).end('No such book');
      return;
    }
    existingBook.author = updatedBook.author;
    existingBook.title = updatedBook.title;
    res.status(201).end('ok');
  }
  else {
    res.status(400).end('Invalid book');
  }
}

exports.delete = function (req, res) {
  let bookToDelete = books.find(book => book.id == req.params.id);
  if ( ! bookToDelete ) {
    res.status(400).end('No such book');
    return;
  }
  let indexToDelete = books.indexOf(bookToDelete);
  books.splice(indexToDelete, 1);
  res.status(200).send('ok');
}

function isValid(book) {
  if ( typeof book !== "object" ) return false;
  if ( typeof book.author == "undefined" ) return false;
  if ( typeof book.title == "undefined" ) return false;
  return true;
}