# TODO API

This is an Express application using `bodyParser` middleware to convert the request body to JSON.

There are currently 7 actions:

- `list` (`GET /todos`): Lists all todos
- `create` (`POST /todos`): Creates a new todo
- `update` (`PUT /todos/:id`): Updates the description of a todo
- `remove` (`DELETE /todos/:id`): Deletes a todo
- `reset` (`DELETE /todos/`): Deletes all todo
- `markAsDone` `put('/todos/:id/done',markAsDone)`: Mark one todo as done
- `markAsNotDone` `delete('/todos/:id/done',markAsNotDone)`: Mark one todo As not done

## Directory structure

- `actions`: Contains the actions as listed above, each as a express handler (function accepting request and response)
- `data`: Contains the data file `todos.json`
- `models`: Contains the Todo model class
- `util`: Utility functions
- `index.js` The application file

## Request body format

When calling the `create` ,`update` , `markAsDone`, `markAsNotDone` actions, the request body should look like this:

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

For IDs, this application uses "UUIDs" (Universally Unique IDs). They can be generated using the `uuid` package, and are guaranteed never to be the same.
