const joi = require('joi');
const { reformatError } = require('../utils/errorFormatter');

const registeruserschema = joi
  .object({
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().trim().min(8).required(),
  })
  .options({
    abortEarly: false,
  });

const loginuserschema = joi
  .object({
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().trim().min(8).required(),
  })
  .options({
    abortEarly: false,
  });

async function validateCredentials(req, res, next) {
  const { path } = req.route;
  try {
    let userdetails = req.body;
    if (path === '/login') {
      userdetails = await loginuserschema.validateAsync(userdetails);
    }
    if (path === '/register') {
      userdetails = await registeruserschema.validateAsync(userdetails);
    }

    req.body = userdetails;
    next();
  } catch (err) {
    res.status(400).json(reformatError(err));
  }
}

module.exports = { validateCredentials };
