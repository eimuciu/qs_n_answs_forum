const router = require('express').Router();
const { privateAuth } = require('../controller/userController');
const { validateData } = require('../middleware/dataValidation');
const { deleteAnswer, updateAnswer } = require('../model/answerModel');

router.delete('/:id', privateAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const resdata = await deleteAnswer(id);
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/answers DELETE route error', err);
    res.status(500).json('Something went wrong');
  }
});

router.put('/:id', privateAuth, validateData, async (req, res) => {
  const answerData = req.body;
  const { id } = req.params;
  try {
    const resdata = await updateAnswer(answerData, id);
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/answers UPDATE route error', err);
    res.status(500).json('Something went wrong');
  }
});

module.exports = {
  answerRoutes: router,
};
