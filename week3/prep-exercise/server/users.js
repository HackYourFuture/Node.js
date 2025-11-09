import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import newDatabase from './database.js';

// Change this boolean to true if you wish to keep your
// users between restart of your application
const isPersistent = false;
const database = newDatabase({isPersistent});

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';
const TOKEN_EXPIRATION = '1h';
const SALT_ROUNDS = 10;

// Simple in-memory index to find users by username quickly
const usersByUsername = new Map();

const sendError = (res, status, message) =>
  res.status(status).json({message});

const normalizeUsername = (username = '') => username.trim();

const validateCredentials = (username, password) => {
  if (!username || !password) {
    return 'Username and password are required.';
  }

  if (typeof username !== 'string' || typeof password !== 'string') {
    return 'Username and password must be strings.';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }

  return null;
};

const cacheUser = (user) => {
  if (user?.username) {
    usersByUsername.set(user.username, user);
  }
};

const createToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, {expiresIn: TOKEN_EXPIRATION});

const getTokenFromHeader = (authorizationHeader = '') => {
  if (!authorizationHeader.startsWith('Bearer ')) {
    return null;
  }

  return authorizationHeader.split(' ')[1];
};

export const register = async (req, res) => {
  try {
    const username = normalizeUsername(req.body?.username);
    const password = req.body?.password;

    const validationError = validateCredentials(username, password);
    if (validationError) {
      return sendError(res, 400, validationError);
    }

    if (usersByUsername.has(username)) {
      return sendError(res, 409, 'Username already exists.');
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const storedUser = database.create({username, passwordHash});

    cacheUser(storedUser);

    return res.status(201).json({id: storedUser.id, username: storedUser.username});
  } catch (error) {
    return sendError(res, 500, 'Unable to register user at this time.');
  }
};

export const login = async (req, res) => {
  try {
    const username = normalizeUsername(req.body?.username);
    const password = req.body?.password;

    const validationError = validateCredentials(username, password);
    if (validationError) {
      return sendError(res, 400, validationError);
    }

    const storedUser = usersByUsername.get(username);

    if (!storedUser) {
      return sendError(res, 401, 'Invalid username or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.passwordHash);

    if (!isPasswordValid) {
      return sendError(res, 401, 'Invalid username or password.');
    }

    const token = createToken({id: storedUser.id});
    return res.status(201).json({token});
  } catch (error) {
    return sendError(res, 500, 'Unable to login at this time.');
  }
};

export const getProfile = (req, res) => {
  try {
    const token = getTokenFromHeader(req.headers?.authorization || '');

    if (!token) {
      return sendError(res, 401, 'Authorization token missing.');
    }

    let decoded;

    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return sendError(res, 401, 'Invalid or expired token.');
    }

    const storedUser = database.getById(decoded.id);

    if (!storedUser) {
      return sendError(res, 401, 'User not found.');
    }

    cacheUser(storedUser);

    return res.json({message: `Welcome ${storedUser.username}`});
  } catch (error) {
    return sendError(res, 500, 'Unable to retrieve profile at this time.');
  }
};

export const logout = (_req, res) => {
  return res.status(204).send();
};
