'use strict';

/* Using `supertest` purely for simplified request structure but not for its
* `expect` methods since they don't provide descriptive-enough messages for the
* purpose of this project
*/
const request = require('supertest');
const test    = require('ava');

const {
  createServer
} = require('../src/server');

const TIMEOUT = 100;

let port = 60000;

test.beforeEach.cb(t => {
  t.context.server = createServer();
  // Run each test on separate port to allow concurrent testing
  t.context.server.listen(port++, t.end);
});

test.afterEach(t => t.context.server.close());

function testCmd(state, ...methods) {
  test(`/${methods.join(', /')} returns ${state}`, async t => {
    let response;
    for (const method of methods)
      try {
        response = await request(t.context.server)
          .get(`/${method}`)
          .timeout(TIMEOUT);
      }
      catch (err) {
        return t.fail(
          `Expected server to respond without an error, got: ${err.message}`
        );
      }

    t.is(response.status, 200, 'Expected status code to be 200');
    t.is(response.headers['content-type'], 'application/json',
      'Expected content type to be application/json'
    );
    t.deepEqual(response.body, { state }, `Expected state to be ${state}`);
  });
}

const range = x => new Array(x).fill();

testCmd(10, 'state');
testCmd(11, 'add');
testCmd(9,  'subtract');
testCmd(10, 'reset');
testCmd(10, 'add', 'reset');
testCmd(10, 'subtract', 'reset');
testCmd(12, 'add', 'add', 'state', 'add', 'subtract');
testCmd(11, 'subtract', 'subtract', 'reset', 'add',  'state', 'subtract', 'add');
testCmd(20, ...range(10).map(() => 'add'), 'state');
testCmd(0,  ...range(10).map(() => 'subtract'), 'state');

test(
  'querying undefined URL returns 404 Not Found',
  async t => {
    let response;
    try {
      response = await request(t.context.server)
        .get(`/random-bad-url`)
        .timeout(TIMEOUT);
    }
    catch (err) {
      return t.fail(
        `Expected server to respond without an error, got: ${err.message}`
      );
    }

    t.is(response.status, 404, 'Expected status code to be 404');
    t.is(response.headers['content-type'], 'application/json',
      'Expected content type to be application/json'
    );
    t.deepEqual(response.body, { error: 'Not found' },
      'Expected response to be 404 Not found'
    );
  }
);
