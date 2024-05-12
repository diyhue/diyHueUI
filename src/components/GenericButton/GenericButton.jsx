import "./genericButton.scss";

const GenericButton = ({ value, color, size, type, onClick }) => {
  return (
    <div
      className={`btn-block ${color} ${size}`}
      onClick={() => onClick && onClick()}
      type={type}
    >
      {value}
    </div>
  );
};

export default GenericButton;
