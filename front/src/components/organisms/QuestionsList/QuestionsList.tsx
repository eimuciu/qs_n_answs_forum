import QuestionCard from '../../molecules/QuestionCard/QuestionCard';
import type { QuestionShape } from '../../../types/types';

interface Props {
  handleDeleteQuestion: (a: string) => void;
  handleUpdateQuestion: (a: QuestionShape) => void;
  questions: QuestionShape[];
}

function QuestionsList({
  questions,
  handleDeleteQuestion,
  handleUpdateQuestion,
}: Props) {
  return (
    <div>
      {questions.map((qObj) => (
        <QuestionCard
          key={qObj._id}
          singleQuestion={qObj}
          handleDeleteQuestion={handleDeleteQuestion}
          handleUpdateQuestion={handleUpdateQuestion}
        />
      ))}
    </div>
  );
}

export default QuestionsList;
