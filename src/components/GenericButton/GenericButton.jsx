import "./genericButton.scss";

const GenericButton = ({value, color, size, type}) => {
  return (
      <input
        type={type}
        value={value}
        className={`btn btn-block ${color} ${size}`}
      />
  );
};

export default GenericButton;