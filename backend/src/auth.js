import jwt from 'jsonwebtoken';
import * as db from './db.js';
/**
 * Authenticates a user and returns an access token upon successful login.
 * @async
 * @function login
 * @param {object} req - Express request object containing user credentials.
 * @param {object} req.body - The request body.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password.
 * @param {object} res - Express response object.
 * @returns {void} Sends a JSON response with the user's name and access to
 * @throws {401} If authentication fails due to invalid credentials.
 * @throws {500} If an internal server error occurs.
 */
export async function login(req, res) {
  const {email, password} = req.body;
  // sql query to find the use
  console.log('calling validate');
  const user = await db.validate(email, password);
  if (user) {
    const accessToken = jwt.sign(
        {id: user.id, email: user.email},
        process.env.secret, {
          expiresIn: '30m',
          algorithm: 'HS256',
        });
    console.log(`returning ${user.id}`);
    res.status(200).json({name: user.name,
      accessToken: accessToken, id: user.id});
  } else {
    res.status(401).send('Invalid credentials');
  }
};
/**
 * Middleware to verify the authentication token and authorize the user.
 * @async
 * @function check
 * @param {object} req - Express request object.
 * @param {object} req.headers - The request headers.
 * @param {string} req.headers.authorization - The authorization header
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Calls `next()` if the token is valid, otherwise sends
 * @throws {403} If the token is invalid or expired.
 */
export async function check(req, res, next) {
  console.log('in check jwt');
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.secret, (err, user) => {
    if (err) {
      console.log('Invalid or expired token:', err.message);
      return res.status(403).json({message: 'Invalid token'});
    }
    req.user = user;
    console.log('User from token:', user);
    next();
  });
};
