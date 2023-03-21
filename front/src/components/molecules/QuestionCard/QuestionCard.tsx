import { useState } from 'react';
import css from './QuestionCard.module.scss';
import { Link } from 'react-router-dom';
import DropDown from '../DropDown/DropDown';
import { useAuthCtx } from '../../../store/AuthProvider';
import { QuestionShape } from '../../../types/types';
import UpdateQuestionForm from '../UpdateQuestionForm/UpdateQuestionForm';
import Modal from '../../atoms/Modal/Modal';

interface Props {
  singleQuestion: QuestionShape;
  handleDeleteQuestion: (a: string) => void;
  handleUpdateQuestion: (a: QuestionShape) => void;
}

function QuestionCard({
  singleQuestion,
  handleDeleteQuestion,
  handleUpdateQuestion,
}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { isUserLoggedIn, user } = useAuthCtx();

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Modal show={showModal} closeModal={closeModal}>
        <UpdateQuestionForm
          closeModal={closeModal}
          handleUpdateQuestion={handleUpdateQuestion}
          questionObj={singleQuestion}
        />
      </Modal>
      <div className={css.main}>
        {isUserLoggedIn && user._id === singleQuestion.uid && (
          <DropDown
            onDelete={() => handleDeleteQuestion(singleQuestion._id)}
            onEdit={openModal}
          />
        )}
        <Link
          to={`/answers/${singleQuestion._id}?question=${JSON.stringify(
            singleQuestion,
          )}`}
        >
          <h3>{singleQuestion.title}</h3>
        </Link>
        <p>{singleQuestion.body}</p>
        <div className={css.info}>
          <span>{singleQuestion.answers} Answers</span>
          <span>
            Asked: {new Date(singleQuestion.createdAt).toLocaleString()}
          </span>
          {singleQuestion.editedAt && (
            <span>
              Edited: {new Date(singleQuestion.editedAt).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default QuestionCard;
