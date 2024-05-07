import { motion } from "framer-motion";

import "./brightnessSlider.scss";

const BrightnessSlider = ({ defaultValue, onChange }) => {
  return (
    <motion.div
      className="sliderContainer"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: {
          opacity: 1,
          height: "auto",
        },
        collapsed: {
          opacity: 0,
          height: 0,
        },
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <input
        type="range"
        min="1"
        max="254"
        defaultValue={defaultValue}
        step="1"
        className="slider"
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </motion.div>
  );
};

export default BrightnessSlider;
