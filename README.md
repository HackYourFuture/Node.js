# TODO API

This is an Express application using `bodyParser` middleware to convert the request body to JSON.

There are currently four actions:

- `list` (`GET /todos`): Lists all todos
- `create` (`POST /todos`): Creates a new todo
- `update` (`PUT /todos/:id`): Updates the description of a todo
- `remove` (`DELETE /todos/:id`): Deletes a todo

## Directory structure

- `actions`: Contains the actions as listed above, each as a express handler (function accepting request and response)
- `data`: Contains the data file `todos.json`
- `models`: Contains the Todo model class
- `util`: Utility functions
- `index.js` The application file

## Request body format

When calling the `create` or `update` actions, the request body should look like this:

```json
{
  "todo": {
    "description": "(todo description)"
  }
}
```

## UUIDs

For IDs, this application uses "UUIDs" (Universally Unique IDs). They can be generated using the `uuid` package, and are guaranteed never to be the same.