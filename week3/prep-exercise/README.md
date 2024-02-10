In this exercise, you will build a secure authentication and authorisation system using Node.js and Express.js with four main endpoints: register, login, getProfile, and logout. The system will utilise JWT (JSON Web Tokens) for managing user sessions.

Requirements:

1. Register Endpoint:

   - Implement a POST endpoint /register that allows users to register with a username and password.
   - Validate the request body to ensure it includes a username and password.
   - Hash the user's password using bcrypt before storing it in memory.
   - Return a success message along with the user's ID and username upon successful registration.

1. Login Endpoint:

   - Create a POST endpoint /login that allows users to log in with their registered credentials.
   - Validate the request body to ensure it includes a username and password.
   - Verify the user's credentials by comparing the hashed password stored in memory.
   - If authentication succeeds, generate a JWT containing the user's ID and sign it with a secret key.
   - Return the JWT token to the client upon successful login.

1. Get Profile Endpoint:

   - Implement a GET endpoint /profile that allows authenticated users to retrieve their profile information.
   - Extract the JWT token from the Authorization header.
   - Verify the JWT token and decode the payload to retrieve the user's ID.
   - Retrieve the user's profile information from memory using the decoded user ID.
   - Return a message with the user's username upon successful profile retrieval.

1. Logout Endpoint:

   - Create a POST endpoint /logout that allows users to logout and invalidate their JWT token.
   - No server-side token invalidation is required; the client should handle token deletion.
   - Return a success response with a status code indicating successful logout (e.g., 204 No Content).
