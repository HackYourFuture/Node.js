# HackYourFuture Node.js Week 1 - Homework

## Instructions

0. Prerequisites
1. Fork this repository
2. Make new branch called `your-username-homework`
3. Install dependencies
4. Read and do the assignment until all tests pass
5. Make a pull request in this repository

## Prerequisites

You need to have Node.js > 8.x installed. Check main [README](../../README.md)
for instructions on how to do that.

## Installing dependencies

Change to the directory where you've cloned this repository, then to
`week1/homework` directory and finally install dependencies:

```bash
cd path/to/your/cloned/repo
cd week1/homework

yarn

# or

npm install
```

## Running tests

Depending your package manager, you can run the tests using:

```bash
yarn test

# or

npm test
```

Try and run the tests without writing any code first. You will see that all the
tests will fail:

```bash
  ✖ /state returns 10 Expected server to respond without an error, got Timeout of 100ms exceeded
  ✖ /add returns 11 Expected server to respond without an error, got Timeout of 100ms exceeded
  ✖ /subtract returns 9 Expected server to respond without an error, got Timeout of 100ms exceeded
  ✖ /reset returns 10 Expected server to respond without an error, got Timeout of 100ms exceeded
  ✖ /add, /reset returns 10 Expected server to respond without an error, got Timeout of 100ms exceeded
  ✖ /subtract, /reset returns 10 Expected server to respond without an error, got Timeout of 100ms exceeded
  ✖ /add, /add, /add, /subtract returns 12 Expected server to respond without an error, got Timeout of 100ms exceeded
  ✖ /subtract, /subtract, /reset, /add, /subtract, /add returns 11 Expected server to respond without an error, got Timeout of 100ms exceeded
  ✖ /add, /add, /add, /add, /add, /add, /add, /add, /add, /add returns 20 Expected server to respond without an error, got Timeout of 100ms exceeded
  ✖ /subtract, /subtract, /subtract, /subtract, /subtract, /subtract, /subtract,/subtract, /subtract, /subtract returns 0 Expected server to respond without an error, got Timeout of 100ms exceeded
  ✖ querying undefined URL returns 404 Not Found Expected server to respond without an error, got Timeout of 100ms exceeded

  11 tests failed
```

Then write the code as required by the assignment and run the tests again. Fix
any issues until all tests pass.

```bash
  ✔ /state returns 10
  ✔ /add returns 11
  ✔ /subtract returns 9
  ✔ /reset returns 10
  ✔ querying undefined URL returns 404 Not Found
  ✔ /add, /reset returns 10
  ✔ /subtract, /reset returns 10
  ✔ /add, /add, /add, /subtract returns 12
  ✔ /subtract, /subtract, /reset, /add, /subtract, /add returns 11
  ✔ /add, /add, /add, /add, /add, /add, /add, /add, /add, /add returns 20
  ✔ /subtract, /subtract, /subtract, /subtract, /subtract, /subtract, /subtract, /subtract, /subtract, /subtract returns 0

  11 tests passed
```

Before submitting your homework via a pull request, make sure that your server
passes all the unit tests as described above.

## Run the project

In `week1/homework` run:

```bash
node .
```

You can interactively test the endpoints with a browser or by using [Postman](https://www.getpostman.com/).

## Assignment

Create an HTTP server that can add and subtract from a number, which we will
call `state`. Use the project in `week1/lecture` directory for reference.

State should be persisted between individual calls and not reset before each
one.

### Rule 1

Your modifications should be limited to the `src` folder. Do not make any
changes to the `test` folder.

### Rule 2

**DO NOT USE EXPRESS.JS**

### Rule 3

You can use other packages, but the server _must_ be implemented using the
built-in `http` module.

## Endpoints to implement

`/state`

Returns the current state in JSON format. When the server starts, this should
return '10'. Example:

```json
{
  "state": 10
}
```

`/add`

Increments state by 1 and returns it JSON format. Example:

```json
{
  "state": 11
}
```

`/subtract`

Decrements state by 1 and returns it JSON format. Example:

```json
{
  "state": 9
}
```

`/reset`

Resets state to 10 and returns it JSON format. Example:

```json
{
  "state": 10
}
```

Any other URL results in an error with status code 404 and response body in JSON
format:

```json
{
  "error": "Not found"
}
```
