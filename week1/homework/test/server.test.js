'use strict';

const request = require('request-promise-native');

const {
  StatusCodeError
} = require('request-promise-core/errors');

const {
  createServer
} = require('../src/server');

const TIMEOUT = 100;

let port = 60000;

function url(_port, method) {
  return `http://localhost:${_port}/${method}`;
}

function test(_port, state, ...methods) {
  it(`/${methods.join(', /')} returns ${state}`, async() => {
    expect.assertions(1);

    const server = await createServer(_port);
    let response;
    for (const method of methods)
      try {
        response = await request({
          url:     url(_port, method),
          timeout: TIMEOUT
        });
      }
      catch (err) {
        server.close();
        throw err;
      }
    server.close();

    const parsed = JSON.parse(response);

    expect(parsed).toEqual({
      state
    });
  });
}

const ten = new Array(10).fill();

describe('homework 1 server', () => {
  // Run each test on separate port to allow concurrent testing
  test(port++, 10, 'state');
  test(port++, 11, 'add');
  test(port++,  9, 'subtract');
  test(port++, 10, 'reset');
  test(port++, 10, 'add', 'reset');
  test(port++, 10, 'subtract', 'reset');
  test(port++, 12, 'add', 'add', 'add', 'subtract');
  test(port++, 11, 'subtract', 'subtract', 'reset', 'add', 'subtract', 'add');
  test(port++, 20, ...ten.map(() => 'add'));
  test(port++,  0, ...ten.map(() => 'subtract'));

  it('querying undefined URL returns 404 Not Found', async() => {
    expect.assertions(1);

    const server = await createServer(++port);
    try {
      await expect(request({
        url:     url(port, 'random-bad-url'),
        timeout: TIMEOUT
      })).rejects
        // .toThrow fails to compare without explicit StatusCodeError
        .toEqual(new StatusCodeError(404, '{"error":"Not found"}'));
    }
    finally {
      server.close();
    }
  });
});
