import { useState } from "react";
import { motion } from "framer-motion";

import "./brightnessSlider.scss";

const BrightnessSlider = ({ defaultValue, onChange }) => {
  const initialSliderValue = Math.round((defaultValue / 100) * 253) + 1;
  const [sliderValue, setSliderValue] = useState(initialSliderValue);

  const percentage = Math.round(((sliderValue - 1) / 253) * 100);

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    onChange(value);
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
      <span className="sliderValue">{percentage}%</span>
      <div className="sliderWrapper">
        <input
          type="range"
          min="1"
          max="254"
          value={sliderValue}
          step="1"
          className="slider"
          onChange={handleChange}
        />
      </div>
    </motion.div>
  );
};

export default BrightnessSlider;
