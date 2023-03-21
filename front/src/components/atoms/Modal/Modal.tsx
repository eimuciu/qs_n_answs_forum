import css from './Modal.module.scss';

interface Props {
  children: JSX.Element;
  show: boolean;
  closeModal: () => void;
}

function Modal({ children, show, closeModal }: Props) {
  const showStyle = show ? 'block' : 'none';
  return (
    <div style={{ display: showStyle }} className={css.main}>
      <div className={css.childContainer}>
        <i onClick={closeModal} className={`fa fa-close ${css.faClose}`}></i>
        {children}
      </div>
    </div>
  );
}

export default Modal;
