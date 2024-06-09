import { motion } from "framer-motion";

import "./iconButton.scss";

const IconButton = ({ iconName, title, color, size, onClick, label }) => {
  const Icon = iconName;

  return (
    <div className={`iconbtn ${size} ${color}`}>
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <Icon title={title} onClick={onClick} />
        <p>{label}</p>
      </motion.div>
    </div>
  );
};

export default IconButton;
