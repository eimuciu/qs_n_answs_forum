import AnswerCard from '../../molecules/AnswerCard/AnswerCard';
import { AnswerShape } from '../../../types/types';

interface Props {
  answers: AnswerShape[];
  handleLike: (a: string) => void;
  handleDislike: (a: string) => void;
  handleDeleteAnswer: (a: string) => void;
  handleEditAnswer: (a: AnswerShape) => void;
}

function AnswersList({
  answers,
  handleLike,
  handleDislike,
  handleDeleteAnswer,
  handleEditAnswer,
}: Props) {
  return (
    <div>
      {answers.map((aObj: any) => (
        <AnswerCard
          key={aObj._id}
          singleAnswer={aObj}
          handleLike={handleLike}
          handleDislike={handleDislike}
          handleDeleteAnswer={handleDeleteAnswer}
          handleEditAnswer={handleEditAnswer}
        />
      ))}
    </div>
  );
}

export default AnswersList;
