const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

function signtoken(data) {
  return jwt.sign(data, secret, { expiresIn: '1h' });
}

function verifytoken(token) {
  return jwt.verify(token, secret);
}

module.exports = { signtoken, verifytoken };
