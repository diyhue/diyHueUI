import "./glassContainer.scss";

const GlassContainer = ({ children, options }) => (
  <div className={`glassContainer ${options}`}>{children}</div>
);

export default GlassContainer;
