# Party time

Are you excited for the biggest party on the planet? We are and we would like to invite everyone, but there is only a limited number of seats.

Start by taking a look at the documentation of the API: https://reservation100-sandbox.mxapps.io/rest-doc/api.
While reading the documentation make sure to note the following:

- Which methods are available (GET or POST)?
- What is the route?
- What headers are expected?
- What should the request body contain, and how it should be formatted?

After you understand the API, write a function that makes a reservation and logs the response to the console. Follow the steps:

1. Use `node-fetch` to make a request with the correct headers and body format
2. Make use of `async/await` and `try/catch`
3. Print the response to the console

Hints:

- To set headers use `fetch(<URL>, { headers: { 'XXXX': 'YYYY' } }`
- The documentation at https://www.npmjs.com/package/node-fetch can be of great help
