const { verifytoken } = require('../utils/tokener');

function privateAuth(req, res, next) {
  try {
    const tkn = req.headers.authorization.split(' ')[1];
    const validtkn = verifytoken(tkn);
    req.uid = validtkn.id;
    next();
  } catch (err) {
    res.status(401).json({ success: false, msg: 'Invalid token' });
  }
}

async function userController(req, res, next) {}

module.exports = { privateAuth };
