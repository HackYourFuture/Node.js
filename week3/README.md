# Node JS Class


### Todays' Meal

1. Recap last Week
2. Homework
3. Q&A
4. Other topics
5. Typescript vs ES6, transpiling javascript
7. Testing with Postman
8. MVC model
9. Express vs native http library
6. Building a REST web API for Todos

### Assignment for this weak:
Create Node JS server that

- Listens on port 8080

- Responds to these endpoints:
	- GET /todos/
		- Returns list of todos
	- POST /todos/
		- add a todo to the list and return the new list
	- DELETE /todos/`<todo index>`
		- remove a todo and return the new list
	- DELETE /todos/
		- clear all the todos from the list

Some other notes:
- All responses should be in JSON.
- Try to apply the MVC model to your file structure. It will save you time in following assignments!
- Test your API using Postman.
- There is a commented out example in my index.js



### Notes

We have supplied a skeleton index.js that serves the home page at http://localhost:8080/. You can build on it or create your own.

Retrieving the body of a POST is not obvious. Please read [the documentation here](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/) and remember to think async.
