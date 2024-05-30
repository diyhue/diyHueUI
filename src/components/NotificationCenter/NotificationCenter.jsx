import { FaBell } from "react-icons/fa";
import { useState } from "react";
import "./notificationCenter.scss";

const NotificationCenter = ({ updating, notifications}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="notificationCenterContainer">
      <div className="notificationBtn" onClick={handleClick}>
        <FaBell />
        {notifications && <div className="notificationDot"></div>}
        {updating && <div className="updating"></div>}
      </div>
      <div className={`notificationCenter ${isActive ? 'active' : ''}`}>
        <div className="arrow"></div>
        <div className="entry">ABC</div>
      </div>
    </div>
  );
};

export default NotificationCenter;