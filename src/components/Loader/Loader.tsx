import "./Loader.less";

const Loader = () => {
  return (
    <div
      className="loader loader--fullscreen"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loader__spinner" aria-hidden="true" />
      <h1 className="loader__title">Proszę czekać</h1>
    </div>
  );
};

export default Loader;
