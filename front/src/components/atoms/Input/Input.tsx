// import styled from 'styled-components';
import css from './Input.module.scss';

interface Props {
  [index: string]: any;
  error?: string | boolean;
}

function Input({ error, ...rest }: Props) {
  const errorStyle = !!error ? '#F75C03' : 'transparent';
  return (
    <div className={css.main}>
      <input
        style={{
          border: `
      2px solid ${errorStyle}`,
        }}
        {...rest}
      />
      <span className={css.errMsg}>{error}</span>
    </div>
  );
}

export default Input;
