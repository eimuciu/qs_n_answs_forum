const router = require('express').Router();
const { privateAuth } = require('../controller/userController');
const { validateData } = require('../middleware/dataValidation');
const {
  getAllQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} = require('../model/questionModel');
const { getAnswersByQuestion, addAnswer } = require('../model/answerModel');

router.get('/', async (req, res) => {
  try {
    const resdata = await getAllQuestions();
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/questions GET route error', err);
    res.status(500).json('Something went wrong');
  }
});

router.post('/', privateAuth, validateData, async (req, res) => {
  const questionData = req.body;
  try {
    const resdata = await addQuestion(questionData);
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/questions POST route error', err);
    res.status(500).json('Something went wrong');
  }
});

router.get('/:id/answers', async (req, res) => {
  const { id } = req.params;
  try {
    const resdata = await getAnswersByQuestion(id);
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/:id/answers GET route error', err);
    res.status(500).json('Something went wrong');
  }
});

router.post('/:id/answers', privateAuth, validateData, async (req, res) => {
  const answerData = req.body;
  try {
    const resdata = await addAnswer(answerData);
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/:id/answers POST route error', err);
    res.status(500).json('Something went wrong');
  }
});

router.delete('/:id', privateAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const resdata = await deleteQuestion(id);
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/questions DELETE route error', err);
    res.status(500).json('Something went wrong');
  }
});

router.put('/:id', privateAuth, validateData, async (req, res) => {
  const questionData = req.body;
  const { id } = req.params;
  try {
    const resdata = await updateQuestion(questionData, id);
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/questions UPDATE route error', err);
    res.status(500).json('Something went wrong');
  }
});

module.exports = { questionRoutes: router };
