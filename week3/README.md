# HackYourFuture Node.js - Reading material week 3

## Agenda

1. Recap last Week
2. Previous homework
3. Questions & answers (Q&A)
4. Testing with Postman
5. Express.js vs native `http` library
6. Building a REST API for To-dos
7. Homework

# TODO API

This is an Express application using `bodyParser` middleware to convert the
request body to JSON.

There are currently four actions:

- `list` (`GET /todos`): Lists all todos
- `create` (`POST /todos`): Creates a new todo
- `update` (`PUT /todos/:id`): Updates the description of a todo
- `remove` (`DELETE /todos/:id`): Deletes a todo

## Directory structure

- `actions`: Contains the actions as listed above, each as an Express handler
             (i.e. function accepting request and response)
- `data`: Contains the data file `todos.json`
- `models`: Contains the Todo model class
- `util`: Utility functions
- `index.js` The application file

## Request body format

When calling the `create` or `update` actions, the request body should look like
this:

```json
{
  "todo": {
    "description": "(todo description)"
  }
}
```

Note that for these actions, the client should add the following header:

- `Content-Type`: `application/json`

In Postman, make sure to add this header, and set the Body type to "Raw".

## UUIDs

For IDs, this application uses "UUIDs" (Universally Unique IDs). They can be
generated using the `uuid` package, and are guaranteed never to be the same.

## Prepare for next module

Check out the [databases repository](https://github.com/HackYourFuture/databases)
and find out how you can prepare for the first database lecture, Jason and Rob
have provided a nice Lynda playlist so we can have a flying kick off.
