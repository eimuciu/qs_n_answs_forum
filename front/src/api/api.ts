import axios, { AxiosResponse } from 'axios';
import { AnswerShape, QuestionShape } from '../types/types';

const BASE_URL = 'http://localhost:3001';

async function getQuestions() {
  try {
    const res: AxiosResponse = await axios.get(`${BASE_URL}/questions`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function getAnswers(qId: string) {
  try {
    const res: AxiosResponse = await axios.get(
      `${BASE_URL}/questions/${qId}/answers`,
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function loginUser(credentials: { email: string; password: string }) {
  try {
    const res: AxiosResponse = await axios.post(
      `${BASE_URL}/user/login`,
      credentials,
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function registerUser(credentials: { email: string; password: string }) {
  try {
    const res: AxiosResponse = await axios.post(
      `${BASE_URL}/user/register`,
      credentials,
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

async function postQuestion(qObj: any) {
  const token = sessionStorage.getItem('tkn');

  try {
    const res: AxiosResponse = await axios.post(`${BASE_URL}/questions`, qObj, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function updateQuestion(qObj: any, qId: string) {
  const token = sessionStorage.getItem('tkn');

  try {
    const res: AxiosResponse = await axios.put(
      `${BASE_URL}/questions/${qId}`,
      qObj,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function postAnswer(aObj: any, qId: string) {
  const token = sessionStorage.getItem('tkn');

  try {
    const res: AxiosResponse = await axios.post(
      `${BASE_URL}/questions/${qId}/answers`,
      aObj,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function updateAnswer(aObj: any, aId: string) {
  const token = sessionStorage.getItem('tkn');

  try {
    const res: AxiosResponse = await axios.put(
      `${BASE_URL}/answers/${aId}`,
      aObj,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function deleteAnswer(aId: string) {
  const token = sessionStorage.getItem('tkn');

  try {
    const res: AxiosResponse = await axios.delete(
      `${BASE_URL}/answers/${aId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function deleteQuestion(qId: string) {
  const token = sessionStorage.getItem('tkn');

  try {
    const res: AxiosResponse = await axios.delete(
      `${BASE_URL}/questions/${qId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (err) {
    console.log(err);
  }
}

export {
  getQuestions,
  getAnswers,
  loginUser,
  registerUser,
  postQuestion,
  postAnswer,
  updateAnswer,
  deleteAnswer,
  deleteQuestion,
  updateQuestion,
};
