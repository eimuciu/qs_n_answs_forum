import css from './TextArea.module.scss';

interface Props {
  [index: string]: any;
  error?: string | boolean;
}

function TextArea({ error, ...rest }: Props) {
  const errorStyle = !!error ? '#F75C03' : 'transparent';

  return (
    <div className={css.main}>
      <textarea
        style={{
          border: `
            2px solid ${errorStyle}`,
        }}
        rows={10}
        {...rest}
      />
      <span className={css.errMsg}>{error}</span>
    </div>
  );
}

export default TextArea;
