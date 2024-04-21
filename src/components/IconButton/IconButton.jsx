import "./iconButton.scss";
import * as Icons from 'react-icons/md';

const IconButton = ({ iconName, title, color, onClick }) => {
  const Icon = Icons[iconName];

  return (
    <div className={`iconbtn ${color}`}>
      <Icon title={title} onClick={onClick} />{" "}
    </div>
  );
};

export default IconButton;