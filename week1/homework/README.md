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
 FAIL  test/server.spec.js
  homework 1 server
    ✕ /state returns 10 (153ms)
    ✕ /add returns 11 (113ms)
    ✕ /subtract returns 9 (109ms)
    ✕ /reset returns 10 (107ms)
    ✕ /add, /reset returns 10 (107ms)
    ✕ /subtract, /reset returns 10 (109ms)
    ✕ /add, /add, /add, /subtract returns 12 (109ms)
    ✕ /subtract, /subtract, /reset, /add, /subtract, /add returns 11 (109ms)
    ✕ /add, /add, /add, /add, /add, /add, /add, /add, /add, /add returns 20 (107ms)
    ✕ /subtract, /subtract, /subtract, /subtract, /subtract, /subtract, /subtract, /subtract, /subtract
, /subtract returns 0 (106ms)
    ✕ querying undefined URL returns 404 Not Found (128ms)
```

Then write the code as required by the assignment and run the tests again. Fix
any issues until all tests pass.

```bash
 PASS  test/server.spec.js
  homework 1 server
    ✓ /state returns 10 (42ms)
    ✓ /add returns 11 (3ms)
    ✓ /subtract returns 9 (2ms)
    ✓ /reset returns 10 (2ms)
    ✓ /add, /reset returns 10 (4ms)
    ✓ /subtract, /reset returns 10 (5ms)
    ✓ /add, /add, /add, /subtract returns 12 (6ms)
    ✓ /subtract, /subtract, /reset, /add, /subtract, /add returns 11 (5ms)
    ✓ /add, /add, /add, /add, /add, /add, /add, /add, /add, /add returns 20 (9ms)
    ✓ /subtract, /subtract, /subtract, /subtract, /subtract, /subtract, /subtract, /subtract, /subtract
, /subtract returns 0 (10ms)
    ✓ querying undefined URL returns 404 Not Found (1ms)
```

## Run the project

In `week1/homework` run:

```bash
node .
```

## Assignment

Create an HTTP server that can add and subtract from a number, which we will
call `state`. Use project in `week1/lecture` directory for reference.

State should be persisted between individual calls and not reset before each
one.

### Rule 1

**DO NOT USE EXPRESS.JS**

### Rule 2

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
