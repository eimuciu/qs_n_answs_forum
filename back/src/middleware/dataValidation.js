const joi = require('joi');
const { reformatError } = require('../utils/errorFormatter');

const questionsschema = joi
  .object({
    title: joi.string().trim().required(),
    body: joi.string().trim().required(),
    isRead: joi.boolean().required(),
    isEdited: joi.boolean().required(),
    uid: joi.string().trim().required(),
    createdAt: joi.date().timestamp('javascript').required(),
    editedAt: joi.date().timestamp('javascript'),
  })
  .options({ abortEarly: false });

const answersschema = joi
  .object({
    body: joi.string().trim().required(),
    isEdited: joi.boolean().required(),
    likes: joi.array().required(),
    dislikes: joi.array().required(),
    uid: joi.string().trim().required(),
    qid: joi.string().trim().required(),
    createdAt: joi.date().timestamp('javascript').required(),
    editedAt: joi.date().timestamp('javascript'),
  })
  .options({ abortEarly: false });

async function validateData(req, res, next) {
  const { baseUrl, route } = req;
  try {
    let data = req.body;
    if (baseUrl === '/questions' && route.path === '/:id/answers') {
      data = await answersschema.validateAsync(data);
      req.body = data;
      next();
      return;
    }
    if (baseUrl === '/questions') {
      data = await questionsschema.validateAsync(data);
    }
    if (baseUrl === '/answers') {
      data = await answersschema.validateAsync(data);
    }

    req.body = data;
    next();
  } catch (err) {
    res.status(400).json(reformatError(err));
  }
}

module.exports = { validateData };
