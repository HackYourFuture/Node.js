# Prep exercise

## Server

In this exercise, you will build a secure authentication and authorization system using Node.js and Express.js with four main endpoints: `register`, `login`, `getProfile`, and `logout`. The system will utilize JWT (JSON Web Tokens) for managing user sessions.

Files to be modified are located in the `server` folder.

Requirements:

1. Register Endpoint:

   - Implement a `POST` endpoint `/auth/register` that allows users to register with a username and password.
   - Validate the request body to ensure it includes a username and password.
   - Hash the user's password using `bcrypt` before storing it in memory.
   - Return a success message along with the user's ID and username upon successful registration, format: `{id: <id>, username: <username>}`
   - In case of any errors along the way, return an appropriate error message (format: `{message: <message-text>}`) with a corresponding status code in the 40x range.

1. Login Endpoint:

   - Create a `POST` endpoint `/auth/login` that allows users to log in with their registered credentials.
   - Verify the user's credentials by comparing the hashed password stored in memory.
   - If authentication succeeds, generate a JWT containing the user's ID and sign it with a secret key.
   - Return the JWT token to the client upon successful login, format: `{token: <token-value>}` with status code 201.
   - In case of any errors along the way, return an appropriate error message (format: `{message: <message-text>}`) with a corresponding status code in the 40x range.

1. Get Profile Endpoint:

   - Implement a `GET` endpoint `/auth/profile` that allows authenticated users to retrieve their profile information.
   - Extract the JWT token from the Authorization header.
   - Verify the JWT token and decode the payload to retrieve the user's ID.
   - Retrieve the user's profile information from memory using the decoded user ID.
   - Return a message with the user's username upon successful profile retrieval.
   - In case of any errors along the way, return an appropriate error message (format: `{message: <message-text>}`) with a status code 401 (Unauthorized).

1. Logout Endpoint:

   - Create a `POST` endpoint `/auth/logout` that allows users to logout and invalidate their JWT token.
   - No server-side token invalidation is required; the client should handle token deletion.
   - Return a success response with a status code indicating successful logout (e.g., 204 No Content).

## Client (optional)

While you can test the endpoints of your API with Postman and/or by creating unit tests with Jest and Supertest, we have also provided a fully functional demo front-end application that demonstrates how a web token based authentication system might be used from the front-end side. The demo front-end resides in the `client` folder and is statically served by the backend. The client expects an API that meets the specification as outlined above.

The client allows you to register, login and logout. After logging in, it uses the received JWT token to fetch the profile of the logged-in user and shows it on its home page. If this fetch fails, e.g. due to an expired token, the user is redirected to the login page.

Upon logging in, the client stores the JWT token in `localStorage`. When the client starts it tries to load this token from `localStorage`. If a token was found it try to load the client's home page directly. This may fail if the token is expired as mentioned earlier in which case the login page is loaded. If no token was found in `localStorage` at client startup the login page is loaded directly.

When logging out, the token is removed from `localStorage` and the user is redirected to the login page.

The process is illustrated in the diagram below.

![client-date-diagram](./assets/client-state-diagram.png)

The client code logs debug information in the browser console. This may help you to follow the application flow as you navigate through its pages.
