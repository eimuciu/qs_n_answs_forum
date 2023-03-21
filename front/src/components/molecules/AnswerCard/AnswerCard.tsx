import { useState } from 'react';
import css from './AnswerCard.module.scss';
import { AnswerShape } from '../../../types/types';
import { useAuthCtx } from '../../../store/AuthProvider';
import { useMsgCtx } from '../../../store/MessagingProvider';
import DropDown from '../DropDown/DropDown';
import Modal from '../../atoms/Modal/Modal';
import UpdateAnswerForm from '../UpdateAnswerForm/UpdateAnswerForm';

interface Props {
  singleAnswer: AnswerShape;
  handleLike: (a: string) => void;
  handleDislike: (a: string) => void;
  handleDeleteAnswer: (a: string) => void;
  handleEditAnswer: (a: AnswerShape) => void;
}

function AnswerCard({
  singleAnswer,
  handleLike,
  handleDislike,
  handleDeleteAnswer,
  handleEditAnswer,
}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { user, isUserLoggedIn } = useAuthCtx();
  const { makeMessage } = useMsgCtx();
  let dislikeStyle;
  let likeStyle;
  if (user) {
    dislikeStyle =
      singleAnswer.dislikes.includes(user._id) && isUserLoggedIn
        ? 'red'
        : 'black';
    likeStyle =
      singleAnswer.likes.includes(user._id) && isUserLoggedIn
        ? 'green'
        : 'black';
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Modal show={showModal} closeModal={closeModal}>
        <UpdateAnswerForm
          answerObj={singleAnswer}
          closeModal={closeModal}
          editAnswerUpdate={handleEditAnswer}
        />
      </Modal>

      <div className={css.main}>
        {isUserLoggedIn && user._id === singleAnswer.uid && (
          <DropDown
            onDelete={() => handleDeleteAnswer(singleAnswer._id)}
            onEdit={openModal}
          />
        )}
        <p>{singleAnswer.body}</p>
        <div className={css.info}>
          <span>
            Answered: {new Date(singleAnswer.createdAt).toLocaleString()}
          </span>
          {singleAnswer.editedAt && (
            <span>
              Edited: {new Date(singleAnswer.editedAt).toLocaleString()}
            </span>
          )}
          <div>
            <span
              role="button"
              onClick={() => {
                if (!isUserLoggedIn) {
                  makeMessage('Please login', 'error');
                  return;
                }
                handleDislike(singleAnswer._id);
              }}
              className={css.reaction}
            >
              {singleAnswer.dislikes.length}{' '}
              <i
                style={{ color: dislikeStyle }}
                className="fa fa-thumbs-down"
              ></i>
            </span>
            <span
              role="button"
              onClick={() => {
                if (!isUserLoggedIn) {
                  makeMessage('Please login', 'error');
                  return;
                }
                handleLike(singleAnswer._id);
              }}
              className={css.reaction}
            >
              {singleAnswer.likes.length}{' '}
              <i style={{ color: likeStyle }} className="fa fa-thumbs-up"></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnswerCard;
