import { useState } from 'react';
import css from './UpdateQuestionForm.module.scss';
import { BigHeader } from '../../atoms/Header/Header';
import Input from '../../atoms/Input/Input';
import TextArea from '../../atoms/TextArea/TextArea';
import { FormButton } from '../../atoms/Button/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateQuestion } from '../../../api/api';
import { useMsgCtx } from '../../../store/MessagingProvider';
import type { QuestionShape } from '../../../types/types';

interface Props {
  closeModal: () => void;
  handleUpdateQuestion: (a: QuestionShape) => void;
  questionObj: QuestionShape;
}

const validation = Yup.object({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Question is required'),
});

function UpdateQuestionForm({
  closeModal,
  handleUpdateQuestion,
  questionObj,
}: Props) {
  const [loading, setLoading] = useState(false);
  const { makeMessage } = useMsgCtx();

  const formik = useFormik({
    initialValues: { body: questionObj.body, title: questionObj.title },
    validationSchema: validation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, actions) => {
      setLoading(true);
      const { _id, ...rest } = questionObj;
      const dataToPost = {
        ...rest,
        title: values.title,
        body: values.body,
        isEdited: true,
        editedAt: new Date().valueOf(),
        createdAt: new Date(rest.createdAt).valueOf(),
      };
      const postResponse = await updateQuestion(dataToPost, questionObj._id);
      if (postResponse && postResponse.data.success) {
        handleUpdateQuestion({ ...dataToPost, _id: questionObj._id });
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
        <BigHeader text="Update question" />
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
        <FormButton type="submit">
          {loading ? 'Waiting...' : 'Update'}
        </FormButton>
      </form>
    </div>
  );
}

export default UpdateQuestionForm;
