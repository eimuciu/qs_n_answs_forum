import css from './MessageModal.module.scss';

interface Props {
  message: string;
  type: 'success' | 'error';
  show: boolean;
}

export function MessageModal({ message, type, show }: Props) {
  const showStyles = show ? 'block' : 'none';
  const colorStyles =
    type === 'success' ? '#04A777' : type === 'error' ? '#D90368' : null;
  return (
    <div
      style={{
        display: showStyles,
        border: `1px solid ${colorStyles}`,
        color: colorStyles as string,
      }}
      className={css.main}
    >
      {message}
    </div>
  );
}

export default MessageModal;
