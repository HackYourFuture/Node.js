> Please help us improve and share your feedback! If you find better tutorials or links, please share them by opening a Pull Request.

# HackYourFuture Node.js - Homework week 3

### Assignment for this weak:

- Read through the code, make sure you understand the flow of the program
- Add three more actions
    - `clear` (`DELETE /todos`) which will clear the list of todos
    - `markAsDone` (`POST /todos/:id/done`) which will set the `done` flag of a single todo to `true`
    - `markAsNotDone` (`DELETE /todos/:id/done`) which will set the `done` flag of a single todo to `false`
- Update your README to reflect your new actions!

Take care of the following:

- All requests that need a body should be in JSON, and follow the request structure of the other actions
- All responses should be in JSON, and follow the response structure of the other actions
- Follow the anatomy of the project
- Make your code DRY (see https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- Follow the REST design principles: use the proper method, response status codes, and consistent URL paths
- Test your API using Postman
