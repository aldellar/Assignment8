import jwt from 'jsonwebtoken';
import * as db from './db.js';

export async function login(req, res) {
  const {email, password} = req.body;
  //sql query to find the use
  console.log(`validation ${email}, ${password}`);
  const user = await db.validate(email, password);
  if (user) {
    const accessToken = jwt.sign(
      {email: user.email}, 
      process.env.secret, {
        expiresIn: '30m',
        algorithm: 'HS256'
      });
    res.status(200).json({name: user.name, accessToken: accessToken});
  } else {
    res.status(401).send('Invalid credentials');
  }
};

export async function check(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.secret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
