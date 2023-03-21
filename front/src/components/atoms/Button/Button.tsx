import css from './Button.module.scss';

interface Props {
  children: string | JSX.Element;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

function Button({ children, onClick }: Props): JSX.Element {
  return (
    <button className={css.button} onClick={onClick}>
      {children}
    </button>
  );
}

export function FormButton({ children, onClick, type }: Props): JSX.Element {
  return (
    <button type={type} className={css.formButton} onClick={onClick}>
      {children}
    </button>
  );
}

export function AnswerButton({ children, onClick, type }: Props): JSX.Element {
  return (
    <button type={type} className={css.answerButton} onClick={onClick}>
      {children}
    </button>
  );
}

export function FilterButton({ children, onClick, type }: Props): JSX.Element {
  return (
    <button type={type} className={css.filterButton} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
