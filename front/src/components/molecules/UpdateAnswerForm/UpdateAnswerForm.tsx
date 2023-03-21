import { useState } from 'react';
import css from './UpdateAnswerForm.module.scss';
import { BigHeader } from '../../atoms/Header/Header';
import TextArea from '../../atoms/TextArea/TextArea';
import { FormButton } from '../../atoms/Button/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateAnswer } from '../../../api/api';
import { useMsgCtx } from '../../../store/MessagingProvider';
import type { AnswerShape } from '../../../types/types';

interface Props {
  closeModal: () => void;
  editAnswerUpdate: (a: AnswerShape) => void;
  answerObj: AnswerShape;
}

const validation = Yup.object({
  body: Yup.string().required('Answer is required'),
});

function UpdateAnswerForm({ closeModal, editAnswerUpdate, answerObj }: Props) {
  const [loading, setLoading] = useState(false);
  const { makeMessage } = useMsgCtx();
  const formik = useFormik({
    initialValues: { body: answerObj.body },
    validationSchema: validation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, actions) => {
      const { _id, ...rest } = answerObj;
      const dataToPost = {
        ...rest,
        body: values.body,
        editedAt: new Date().valueOf(),
        createdAt: new Date(answerObj.createdAt).valueOf(),
        isEdited: true,
      };
      setLoading(true);
      const postResponse = await updateAnswer(dataToPost, answerObj._id);
      if (postResponse && postResponse.data.success) {
        editAnswerUpdate({ ...dataToPost, _id: answerObj._id });
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
        <TextArea
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          name="body"
          type="text"
          error={formik.touched.body && formik.errors.body}
        />
        <FormButton type="submit">
          {loading ? 'Waiting...' : 'Update'}
        </FormButton>
      </form>
    </div>
  );
}

export default UpdateAnswerForm;
