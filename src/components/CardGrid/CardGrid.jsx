import "./cardGrid.scss";

const CardGrid = ({ children, options }) => <div className={`cardGrid ${options}`}>{children}</div>;

export default CardGrid;
