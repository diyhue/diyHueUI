import "./genericButton.scss";

const GenericButton = ({ value, color, size, type, onClick }) => {
  return (
    <input
      type={type}
      value={value}
      className={`btn btn-block ${color} ${size}`}
      onClick={() => onClick && onClick()}
    />
  );
};

export default GenericButton;