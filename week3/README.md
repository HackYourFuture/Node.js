# Reading Material Node.js Week 3

## Agenda

1. [What is authentication?](https://study.hackyourfuture.net/#/node-js/authentication.md)

2. New user registration
   - [Adding users to our application](https://study.hackyourfuture.net/#/node-js/user-registration.md)
   - [How to securely store user passwords](https://study.hackyourfuture.net/#/node-js/storing-passwords.md)

3. [Session management](https://study.hackyourfuture.net/#/node-js/session-management)
   - Login and session tokens
   - The `Authorization` header
   - Protected endpoints
   - Logout

4. [JSON Web Tokens](https://study.hackyourfuture.net/#/node-js/jwt-tokens.md) 

5. [Automated API testing](https://study.hackyourfuture.net/#/testing/api-testing.md)
   - [Postman](https://www.postman.com/automated-testing/)
   - [supertest](https://www.npmjs.com/package/supertest)


## Week goals

This week we are going to learn about one of the most common tasks for any multi user application - `Authentication`. User authentication consists of new user registration, login, logout and identifying the currently logged in user in our API.

You may have noticed a common trend when visiting websites that require you to sign up:

1. **Registration** - creating a new user
2. **Login** - sending your credentials to enter the website.
3. **Accessing protected resources** - getting access to a special place in the website that only you can access (ex: shopping card, profile page)
4. **Logout** - Stop using the website.

We will learn how to implement user registration and securely store user passwords. We will also learn how to implement a login endpoint and check if the provided username / password combination is correct. Lastly, we will implement a special endpoint that can be only accessible to a user who previously logged in.

Lastly, it is time to learn how to automate the testing of our API's. This can be done in Postman using [automated testsuites](https://www.postman.com/use-cases/api-testing-automation/) but we are going to do it using code, similar to unit testing learned in JavaScript. Have a look [here](https://study.hackyourfuture.net/#/testing/api-testing.md) on how to do that using the [supertest](https://www.npmjs.com/package/supertest) library.

## Finished?

Are you finished with going through the materials? High five! If you feel ready to get practical, click [here](./MAKEME.md).
