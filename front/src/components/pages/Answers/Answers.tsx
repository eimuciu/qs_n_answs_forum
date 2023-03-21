import css from './Answers.module.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAnswers, updateAnswer, deleteAnswer } from '../../../api/api';
import paramsvalue from '../../../utils/getParams';
import QuestionCard from '../../molecules/QuestionCard/QuestionCard';
import { SmallHeader } from '../../atoms/Header/Header';
import AnswersList from '../../organisms/AnswersList/AnswersList';
import BouncingLoader from '../../molecules/BouncingLoader/BouncingLoader';
import { AnswerButton } from '../../atoms/Button/Button';
import { useAuthCtx } from '../../../store/AuthProvider';
import Modal from '../../atoms/Modal/Modal';
import AnswerQuestionForm from '../../organisms/AnswerQuestionForm/AnswerQuestionForm';
import type { AnswerShape, QuestionShape } from '../../../types/types';
import { useMsgCtx } from '../../../store/MessagingProvider';

const actionGetAnswers = async (
  id: string,
  setAnswers: (a: AnswerShape[]) => void,
  setLoading: (a: boolean) => void,
) => {
  const res = await getAnswers(id);
  if (res && res.success) {
    setAnswers(res.data);
    setLoading(false);
    return;
  }
};

interface Props {
  handleDeleteQuestion: (a: string) => void;
}

const destructureParams = () => {
  const params = paramsvalue('question');
  if (params) return JSON.parse(params);
};

function Answers({ handleDeleteQuestion }: Props) {
  const { id } = useParams();
  const [answers, setAnswers] = useState<AnswerShape[]>([]);
  const [question, setQuestion] = useState<QuestionShape>(destructureParams());
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isUserLoggedIn, user } = useAuthCtx();
  const { makeMessage } = useMsgCtx();

  useEffect(() => {
    setLoading(true);
    if (id) actionGetAnswers(id, setAnswers, setLoading);
  }, [id]);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleAnswerQuestionButton = () => {
    openModal();
  };

  const handleAddAnswer = (aObj: AnswerShape) => {
    setAnswers((prev) => [aObj, ...prev]);
  };

  const handleLike = (aId: string) => {
    const findAnswer = answers.filter((a) => a._id === aId)[0];
    const reshapedAnswer = { ...findAnswer };
    const userId = user._id;
    if (!reshapedAnswer.dislikes.includes(userId)) {
      if (reshapedAnswer.likes.includes(userId)) {
        reshapedAnswer.likes = reshapedAnswer.likes.filter(
          (sL) => sL !== userId,
        );
      } else {
        reshapedAnswer.likes.push(userId);
      }
    }
    setAnswers((prev) => {
      return prev.map((ans) => {
        if (ans._id === reshapedAnswer._id) {
          return reshapedAnswer;
        }
        return ans;
      });
    });
    const { _id, ...rest } = reshapedAnswer;
    const editedKey = rest.editedAt
      ? { editedAt: new Date(rest.editedAt).valueOf() }
      : undefined;
    updateAnswer(
      { ...rest, createdAt: new Date(rest.createdAt).valueOf(), ...editedKey },
      aId,
    );
  };

  const handleDislike = (aId: string) => {
    const findAnswer = answers.filter((a) => a._id === aId)[0];
    const reshapedAnswer = { ...findAnswer };
    const userId = user._id;
    if (!reshapedAnswer.likes.includes(userId)) {
      if (reshapedAnswer.dislikes.includes(userId)) {
        reshapedAnswer.dislikes = reshapedAnswer.dislikes.filter(
          (sL) => sL !== userId,
        );
      } else {
        reshapedAnswer.dislikes.push(userId);
      }
    }
    setAnswers((prev) => {
      return prev.map((ans) => {
        if (ans._id === reshapedAnswer._id) {
          return reshapedAnswer;
        }
        return ans;
      });
    });
    const { _id, ...rest } = reshapedAnswer;
    updateAnswer(
      { ...rest, createdAt: new Date(rest.createdAt).valueOf() },
      aId,
    );
  };

  const handleDeleteAnswer = async (aId: string) => {
    const res = await deleteAnswer(aId);
    if (res?.data.success) {
      makeMessage(res.data.msg, 'success');
      setAnswers((prev) => {
        return prev.filter((sAns) => sAns._id !== aId);
      });
      return;
    }
    makeMessage(res?.data.msg, 'error');
  };

  const handleEditAnswer = (aObj: AnswerShape) => {
    setAnswers((prev) => {
      return prev.map((sA) => (sA._id === aObj._id ? aObj : sA));
    });
  };

  const handleUpdateQuestion = (qObj: QuestionShape) => {
    setQuestion((_) => ({ ...qObj }));
  };

  return (
    <>
      <Modal show={showModal} closeModal={closeModal}>
        <AnswerQuestionForm
          closeModal={closeModal}
          addAnswer={handleAddAnswer}
          questionId={question._id}
        />
      </Modal>
      <div>
        <QuestionCard
          singleQuestion={question}
          handleDeleteQuestion={handleDeleteQuestion}
          handleUpdateQuestion={handleUpdateQuestion}
        />
        <div className={css.smallContainer}>
          <SmallHeader text={`${answers.length} Answers`} />
          <div>
            {isUserLoggedIn && (
              <AnswerButton onClick={handleAnswerQuestionButton}>
                Answer question
              </AnswerButton>
            )}
          </div>
        </div>
        {loading ? (
          <BouncingLoader />
        ) : (
          <AnswersList
            answers={answers}
            handleLike={handleLike}
            handleDislike={handleDislike}
            handleDeleteAnswer={handleDeleteAnswer}
            handleEditAnswer={handleEditAnswer}
          />
        )}
      </div>
    </>
  );
}

export default Answers;
