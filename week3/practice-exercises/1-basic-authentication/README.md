# Basic Authentication

So far all the APIs we used would happily respond to any request. In reality, most APIs hold sensitive information that should not be accessible for everyone.

In order to guard the data APIs use some way to `authenticate` the user. To authenticate essentially means: to verify the identity of the user. Does the server "know" them, or is it a complete stranger?

The simplest form of authentication is appropriately called _basic_. Similarly to how you log in to a website, the basic authentication expect a username and a password. This is sent in the request as part of the header, under the type: `Authorization`. The content of the header is: `Basic <username>:<password>`.

Naturally, there is catch. The username and password are not sent as plain text, but need to be encoded in base64, which is a way of encoding text for use in HTTP.

For this exercise you'll make an API request using Node.js. You'll be making a request to an API that requires you to authenticate yourself.

The API endpoint can be found at https://httpbin.org/basic-auth/admin/hvgX8KlVEa. In order to use it, you need to use the credentials `admin:hvgX8KlVEa` to authenticate.

### Follow the steps:

#### Step 1
Visit the URL from the browser. What happens? 

#### Step 2
Visit https://it-tools.tech/base64-string-converter/ to convert the following credentials to base64 encoding:
```md
admin:hvgX8KlVEa
```

#### Step 3
Modify `basic-auth.js` to perform a fetch request and set the `Authorization` header and API URL in the GET request.

```js
fetch(<INSERT_API_URL>, {
    headers: { 'Authorization': 'Basic <INSERT_BASE64_CREDENTIALS>' }
  });
// handle response...
```
Print the response body to the console

#### Step 4
Add error handling with `async/await` and `try/catch`.
If everything is correct, you should get HTTP 200 with a response. If the password is incorrect or missing, you will get HTTP 401

#### Step 5
Create two constants `username` and `password` to store the username/password before the base64 conversion. Then convert the username and password to base64 from Node.JS class to automate step 2 using code. Print the encoded base64 string to the console and compare it to the one created in step 2.

(_Hint: Use `Buffer.from(...)` or `btoa()`_)

#### Step 6
Test the new code to confirm it is still working well. 
