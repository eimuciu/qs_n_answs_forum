import { useState } from 'react';
import css from './AskQuestionForm.module.scss';
import { BigHeader } from '../../atoms/Header/Header';
import Input from '../../atoms/Input/Input';
import TextArea from '../../atoms/TextArea/TextArea';
import { FormButton } from '../../atoms/Button/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postQuestion } from '../../../api/api';
import { useAuthCtx } from '../../../store/AuthProvider';
import { useMsgCtx } from '../../../store/MessagingProvider';
import type { QuestionShape } from '../../../types/types';

interface Props {
  closeModal: () => void;
  addQuestion: (a: QuestionShape) => void;
}

const questionShape = {
  body: '',
  createdAt: new Date().valueOf(),
  isEdited: false,
  isRead: false,
  title: '',
  uid: '',
};

const initialValues = {
  title: '',
  body: '',
};

const validation = Yup.object({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Question is required'),
});

function AskQuestionForm({ closeModal, addQuestion }: Props) {
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
      const postResponse = await postQuestion({
        ...questionShape,
        uid: user._id,
        title: values.title,
        body: values.body,
      });
      if (postResponse && postResponse.data.success) {
        addQuestion(postResponse.data.data);
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
        <BigHeader text="Ask question" />
      </span>
      <form onSubmit={formik.handleSubmit}>
        <Input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          name="title"
          type="text"
          placeholder="Title"
          error={formik.touched.title && formik.errors.title}
        />
        <TextArea
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          name="body"
          type="text"
          placeholder="Question"
          error={formik.touched.body && formik.errors.body}
        />
        <FormButton type="submit">{loading ? 'Waiting...' : 'Ask'}</FormButton>
      </form>
    </div>
  );
}

export default AskQuestionForm;
