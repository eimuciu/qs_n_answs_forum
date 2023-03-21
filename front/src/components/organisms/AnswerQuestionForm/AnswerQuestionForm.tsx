import { useState } from 'react';
import css from './AnswerQuestionForm.module.scss';
import { BigHeader } from '../../atoms/Header/Header';
import TextArea from '../../atoms/TextArea/TextArea';
import { FormButton } from '../../atoms/Button/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postAnswer } from '../../../api/api';
import { useAuthCtx } from '../../../store/AuthProvider';
import { useMsgCtx } from '../../../store/MessagingProvider';
import type { AnswerShape } from '../../../types/types';

interface Props {
  closeModal: () => void;
  addAnswer: (a: AnswerShape) => void;
  questionId: string;
}

const answerShape = {
  body: '',
  createdAt: new Date().valueOf(),
  dislikes: [],
  isEdited: false,
  likes: [],
  qid: '',
  uid: '',
};

const initialValues = {
  body: '',
};

const validation = Yup.object({
  body: Yup.string().required('Answer is required'),
});

function AnswerQuestionForm({ closeModal, addAnswer, questionId }: Props) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthCtx();
  const { makeMessage } = useMsgCtx();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, actions) => {
      setLoading(true);
      const postResponse = await postAnswer(
        {
          ...answerShape,
          uid: user._id,
          body: values.body,
          qid: questionId,
        },
        questionId,
      );
      if (postResponse && postResponse.data.success) {
        addAnswer(postResponse.data.data);
        setLoading(false);
        makeMessage(postResponse.data.msg, 'success');
        closeModal();
        actions.resetForm();
        return;
      }
      setLoading(false);
      makeMessage(postResponse?.data.msg, 'error');
    },
  });

  return (
    <div className={css.main}>
      <span>
        <BigHeader text="Answer question" />
      </span>
      <form onSubmit={formik.handleSubmit}>
        <TextArea
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          name="body"
          type="text"
          placeholder="Answer"
          error={formik.touched.body && formik.errors.body}
        />
        <FormButton type="submit">
          {loading ? 'Waiting...' : 'Answer'}
        </FormButton>
      </form>
    </div>
  );
}

export default AnswerQuestionForm;
