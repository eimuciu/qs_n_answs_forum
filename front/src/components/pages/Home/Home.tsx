import { useState, useEffect } from 'react';
import css from './Home.module.scss';
import Button, { FilterButton } from '../../atoms/Button/Button';
import { BigHeader } from '../../atoms/Header/Header';
import QuestionsList from '../../organisms/QuestionsList/QuestionsList';
import { getQuestions } from '../../../api/api';
import { useAuthCtx } from '../../../store/AuthProvider';
import Modal from '../../atoms/Modal/Modal';
import AskQuestionForm from '../../organisms/AskQuestionForm/AskQuestionForm';
import { useMsgCtx } from '../../../store/MessagingProvider';
import BouncingLoader from '../../molecules/BouncingLoader/BouncingLoader';
import type { QuestionShape } from '../../../types/types';

const actionGetQuestions = async (
  setQuestions: (a: any) => void,
  setLoading: (a: any) => void,
) => {
  const res = await getQuestions();
  if (res.success) {
    setQuestions(res.data);
    setLoading(false);
    return;
  }
};

interface Props {
  handleDeleteQuestion: (a: string, b: (c: string) => void) => void;
}

function Home({ handleDeleteQuestion }: Props) {
  const [questions, setQuestions] = useState<QuestionShape[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isUserLoggedIn } = useAuthCtx();
  const { makeMessage } = useMsgCtx();

  useEffect(() => {
    setLoading(true);
    actionGetQuestions(setQuestions, setLoading);
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const askQuestionHandler = () => {
    if (!isUserLoggedIn) {
      makeMessage('Please login before asking a question', 'error');
      return;
    }
    openModal();
  };

  const handleAddQuestion = (qObj: QuestionShape) => {
    setQuestions((prev) => [qObj, ...prev]);
  };

  const deleteStateUpdate = (qId: string) => {
    setQuestions((prev) => {
      return prev.filter((sQ) => sQ._id !== qId);
    });
  };

  const handleUpdateQuestion = (qObj: QuestionShape) => {
    setQuestions((prev) => {
      return prev.map((sQ) => (sQ._id === qObj._id ? qObj : sQ));
    });
  };

  const filterBy = (filter: string) => {
    const qCopy = [...questions];

    switch (filter) {
      case 'DATE':
        qCopy.sort((a, b) =>
          new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1,
        );
        setQuestions(qCopy);
        break;
      case 'ANSWERS':
        qCopy.sort((a, b) => (a.answers < b.answers ? 1 : -1));
        setQuestions(qCopy);
        break;
      case 'UNANSWERED':
        qCopy.sort((a, b) => (a.answers > b.answers ? 1 : -1));
        setQuestions(qCopy);
        break;
    }
  };

  return (
    <>
      <Modal show={showModal} closeModal={closeModal}>
        <AskQuestionForm
          closeModal={closeModal}
          addQuestion={handleAddQuestion}
        />
      </Modal>
      <div className={css.main}>
        <div className={css.header}>
          <BigHeader text="All Questions" />
          <Button onClick={askQuestionHandler}>Ask Question</Button>
        </div>
        <div className={css.sortingContainer}>
          <p>{questions.length} questions</p>
          <div>
            <FilterButton onClick={() => filterBy('DATE')}>
              By Date
            </FilterButton>
            <FilterButton onClick={() => filterBy('ANSWERS')}>
              By Answers
            </FilterButton>
            <FilterButton onClick={() => filterBy('UNANSWERED')}>
              Unanswered
            </FilterButton>
          </div>
        </div>
        {loading ? (
          <BouncingLoader />
        ) : (
          <QuestionsList
            questions={questions}
            handleDeleteQuestion={(qId) =>
              handleDeleteQuestion(qId, deleteStateUpdate)
            }
            handleUpdateQuestion={handleUpdateQuestion}
          />
        )}
      </div>
    </>
  );
}

export default Home;
