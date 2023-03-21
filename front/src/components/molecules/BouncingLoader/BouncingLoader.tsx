import css from './BouncingLoader.module.scss';

function BouncingLoader() {
  return (
    <div className={css.bouncingLoader}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default BouncingLoader;
