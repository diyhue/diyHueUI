import { motion } from "framer-motion";
import { useState } from "react";

import "./brightnessSlider.scss";

const BrightnessSlider = ({ defaultValue, onChange, max = "254" }) => {
  const [value, setValue] = useState(Math.round((defaultValue / 100) * max));

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <motion.div
      className="sliderContainer"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: {
          opacity: 1,
          height: 25,
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
        max={max}
        value={value}
        step="1"
        className="slider"
        onChange={handleChange}
      />
      <div className="sliderValue">{value}</div>
    </motion.div>
  );
};

export default BrightnessSlider;
