import css from './DropDown.module.scss';
import { useState } from 'react';

interface Props {
  onDelete: () => void;
  onEdit: () => void;
}

function DropDown({ onDelete, onEdit }: Props) {
  const [open, setOpen] = useState(false);
  const openStyles = open ? 'block' : 'none';

  const openDropDown = () => {
    setOpen(!open);
  };

  return (
    <div onClick={openDropDown} className={css.main}>
      <div className={css.dropContainer}>
        <i className={`fa fa-arrow-circle-${open ? 'down' : 'left'}`}></i>
        <div className={css.dropItems} style={{ display: openStyles }}>
          <p onClick={onEdit}>Edit</p>
          <p onClick={onDelete}>Delete</p>
        </div>
      </div>
    </div>
  );
}

export default DropDown;
