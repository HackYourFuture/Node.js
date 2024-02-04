# Basic Authentication

So far all the APIs we used would happily respond to any request. In reality, most APIs hold sensitive information that should not be accessible for everyone.

In order to guard the data APIs use some way to `authenticate` the user. To authenticate essentially means: to verify the identity of the user. Does the server "know" them, or is it a complete stranger?

The simplest form of authentication is appropriately called _basic_. Similarly to how you log in to a website, the basic authentication expect a username and a password. This is sent in the request as part of the header, under the type: `Authorization`. The content of the header is: `Basic <username>:<password>`.

Naturally, there is catch. The username and password are not sent as plain text, but need to be encoded in base64, which is a way of encoding text for use in HTTP.

For this exercise you'll make an API request using Node.js. You'll be making a request to an API that requires you to authenticate yourself.

The API can be found at https://restapiabasicauthe-sandbox.mxapps.io/api/books. In order to use it, you need to use the credentials `admin:hvgX8KlVEa` to authenticate.

Follow the steps:

1. Visit https://www.base64encode.org/ to convert the following credentials to base64 encoding:

```md
admin:hvgX8KlVEa
```

2. Set the Authorization header and API URL in the GET request (use `node-fetch`)

```js
fetch(<INSERT_API_URL>, {
    headers: { 'Authorization': 'Basic <INSERT_BASE64_CREDENTIALS>' }
  });
```

3. Print the response to the console

Use `async/await` and `try/catch`
