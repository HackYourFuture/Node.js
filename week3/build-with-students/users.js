import { v4 as generateUUID } from 'uuid';
import { hash, compare } from 'bcrypt';

// The higher the number, the more secure password but also slower the hashing process.
const saltRounds = 10; 

const usersDatabase = [{
  id: "9a2cd641-3bc5-4334-9813-926543e08426",
  username: "alice1",
  password: "$2b$10$Coxs6k4gAnMIKI1wcgpRpOVHSD7um5QaIoHBCqfeLHu6yYRqyRbcm" // 1234
}];

let sessions = [
  {
    token: "13422ece-d321-49d8-8f8f-11cb6d67287f",
    userId: "9a2cd641-3bc5-4334-9813-926543e08426"
  }
];

export const register = async (req, res) => {
  // Check request body
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: 'Please provide username and password' }).end();
    return;
  }

  // Check if username already exists
  const isUsernameExists = getUserByUsername(req.body.username) !== undefined;
  if (isUsernameExists) {
    res.status(400).json({ message: 'Username already exists' }).end();
    return;
  }

  // Hash the password and create new user
  const hashedPassword = await hash(req.body.password, saltRounds);
  const newUser = {
    id: generateUUID(),
    username: req.body.username,
    password: hashedPassword,
  };

  // Save user to usersDatabase
  usersDatabase.push(newUser);

  // Return success and the new user to the client
  res.status(201).json({ 
    id: newUser.id, 
    username: newUser.username,
  }).end();
};


export const login = async (req, res) => {
  // Check request body
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ message: 'Please provide username and password' }).end();
    return;
  }

  // Find user in the database
  const user = getUserByUsername(req.body.username);
  if (!user) {
    res.status(401).json({ message: 'Invalid username / password combination' }).end();
    return;
  }

  // Check if password is correct by using bcrypt compare
  const isPasswordCorrect = await compare(req.body.password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).json({ message: 'Invalid username / password combination' }).end();
    return;
  }

  // Login successfully - create a session token
  const token = generateUUID();

  // Save the session token
  sessions.push({ token, userId: user.id });

  // Return the token to the client
  // The client should save the token and send it in the Authorization header for future requests:
  // Authorization: bearer <token>
  res.status(200).json({ token }).end();
};


export const getProfile = (req, res) => {
    // Check if user is logged in
  const token = extractBearerTokenFromAuth(req.headers.authorization);
  const session = getSessionByToken(token);
  if (!session) {
    res.status(401).json({ message: 'You are not logged in' }).end();
    return;
  }

  // Get user details from the session
  const user = getUserById(session.userId);
  if (!user) {
    res.status(401).json({ message: 'You are not logged in' }).end();
    return;
  }

  // Return a message with the username
  res.status(200).json({ message: `Hello! You are currently logged in as ${user.username}!` }).end();
};

export const logout = (req, res) => {
  const token = extractBearerTokenFromAuth(req.headers.authorization);

  // remove the session from the sessions array
  sessions = sessions.filter(session => session.token !== token);
  res.status(204).end();
};


// Helper functions
const getUserByUsername = (username) => {
  return usersDatabase.find(user => user.username === username);
};

const getUserById = (userID) => {
  return usersDatabase.find(user => user.id === userID);
};

const getSessionByToken = (token) => {
  return sessions.find(session => session.token === token);
};

const extractBearerTokenFromAuth = (authorization) => {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null;
  }
  return authorization.replace('Bearer ', '');
}