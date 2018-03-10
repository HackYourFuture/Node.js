# HackYourFuture Node.js Week 1 - Homework

## Setup

Follow these instructions to set up your environment.

### 1. Fork this repository and clone it to your hard drive

Follow the general homework instructions for this.

### 2. Install dependencies

Change to the directory where you've cloned this repository, then to
`week1/homework` directory and finally install dependencies using `npm`.

```bash
cd path/to/your/cloned/repo
cd week1/homework
npm install
```

### 3. Run the project from that directory

```bash
node .
```

## Assignment

Create an HTTP server that can add and subtract from a number, which we will
call `state`. Use project in `week1` directory as starting material.
Pay extra attention to line 21, which contains some hints for this week
`console.log('New http request received', request.url);`

### Rule 1

**DO NOT USE EXPRESS.JS**

### Rule 2

You can use other packages, but you _must_ also make a version _without_ any npm
packages. `http`, of course, is a built-in Node.js package, so you can use that.

```js
// The state variable
let state = 10;
```

## Endpoints criteria

```js
/* /state
 * response: the current state in a HTML format
 * When the server starts, this should return '10'
 */
const stateUrl = 'http://localhost:8080/state';

/* /add
 * Response: "OK" in HTML format
 * This should add 1 to the current state
 */
const addUrl = 'http://localhost:8080/add';

/* /subtract
 * Response: "OK" in HTML format
 * This should subtract 1 ƒrom the current state
 */
const subtractUrl = 'http://localhost:8080/subtract';

/* /reset
 * Response: "OK" in HTML format
 * This should set the state back to '10'
 */
const resetUrl = 'http://localhost:8080/reset';

/* Any other URL
 * Response: return error code 404: 'Not found' with a friendly message and do
 * not change the state variable
 */
const badUrl = 'http://localhost:8080/bad';
```

## Reading

### Callbacks

Video: https://www.youtube.com/watch?v=pTbSfCT42_M
Read: http://callbackhell.com/

### Require/exporting

Video: https://www.youtube.com/watch?v=e1Ln1FrLvh8
Read: http://openmymind.net/2012/2/3/Node-Require-and-Exports/

### `http`, `listen`
- Video basic: https://www.youtube.com/watch?v=pYOltVz7kL0
- Video routing: https://www.youtube.com/watch?v=_D2w0voFlEk (please focus on `request.url`, not `request.method`)
- Read: [Node.js documentation about `http`](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
- Read Advanced:

While not strictly homework, we’ve created another playlist if you’d like to
learn more or review (and as JavaScript developers, you should)
https://www.lynda.com/SharedPlaylist/78e6513f51bb4102b03349460491b4e3
