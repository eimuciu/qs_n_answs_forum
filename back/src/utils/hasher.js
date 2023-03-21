const bcrypt = require('bcryptjs');

function makehash(psw) {
  return bcrypt.hashSync(psw, 10);
}

function comparehash(plain, hashed) {
  return bcrypt.compareSync(plain, hashed);
}

module.exports = { makehash, comparehash };
