# HackYourFuture Node.js Week 3

## Agenda

1. Recap last Week
2. Previous homework
3. Questions & answers (Q&A)
4. Testing with Postman
5. Express.js vs native `http` library
    1. HTTP request method refresher
    2. HTTP response status code refresher
    3. Routing
    4. Example
6. Building a REST API for To-Dos
7. Homework

## Last week's summary

Last week we made a CLI To-Do application. This week we are going to rewrite it
into an Express-based server.

## Testing with Postman

Download and install [Postman](https://www.getpostman.com/apps).

Videos:

[Getting Started with Postman](https://www.youtube.com/watch?v=q78_AJBGrVw)

## Express.js vs native `http` library

Videos:

[Introduction to Express](https://www.youtube.com/watch?v=9TSBKO59u0Y&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp&index=23)

[Express Route Params](https://www.youtube.com/watch?v=MuMs1pLuT7I&index=24&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp)

[Middleware & Static Files](https://www.youtube.com/watch?v=-lRgL9kj_h0&index=28&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp)

Documentation:

[Express.js Hello World](https://expressjs.com/en/starter/hello-world.html)

[Express.js routing](https://expressjs.com/en/guide/routing.html)

[Express.js API](https://expressjs.com/en/4x/api.html)

[HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

[HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## Building a REST API for To-Dos

Videos:

[What is REST?](http://www.restapitutorial.com/lessons/whatisrest.html)

Documentation:

[REST](https://en.wikipedia.org/wiki/Representational_state_transfer)

[Learn REST: A RESTful Tutorial](http://www.restapitutorial.com/)

### To-Do API

This week we are going to write an Express application with request body in JSON
format.

There are 4 [CRUD](https://en.wikipedia.org/wiki/Create%2C_read%2C_update_and_delete)
actions:

#### `createTodo` (`POST /todos`)

  Creates a new to-do

#### `readTodos` (`GET /todos`)

  Reads and lists all to-dos

#### `updateTodo` (`PUT /todos/:id`)

  Updates the description of a to-do with ID `:id`

#### `deleteTodo` (`DELETE /todos/:id`)

  Deletes a to-do with ID `:id`

### Request Body Format

When calling the `create` or `update` actions, the request body must look like
this:

```json
{
  "todo": {
    "description": "(todo description)"
  }
}
```

Note that for these actions, the client must add the following header:

- `Content-Type`: `application/json`

In Postman, make sure to add this header, and set the Body type to _raw_ and
_JSON (application/json)_.

## UUIDs

For IDs, this application uses [UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier) -
Universally Unique IDs. They can be generated using the [uuid/v4](https://github.com/kelektiv/node-uuid)
package, and are guaranteed never to be the same.

## Homework

Check [README.md](homework/README.md) in `homework` subdirectory.

## Prepare for the next module

Check out the [databases repository](https://github.com/HackYourFuture/databases)
and find out how you can prepare for the first database lecture, Jason and Rob
have provided a nice Lynda playlist so we can have a flying kick off.
