import React, { useRef, useEffect, useState } from "react";
import iro from "@jaames/iro";
import './gradientColorpicker.scss';

export default function GradientColorpicker() {
  const pickerRef = useRef(null);
  const picker = useRef(null);
  const [gradientStyle, setGradientStyle] = useState({});

  useEffect(() => {
    const onChange = () => {
      const colors = picker.current.colors.map(color => color.hexString);
      const gradient = {
        colors: colors,
      };
      console.log(gradient);
      const activeColor = picker.current.color.hexString;
      const activeColorIndex = picker.current.colors.findIndex(color => color.hexString === activeColor);
      console.log("Active color:", activeColor, "at position:", activeColorIndex);


      // Update gradient style
      setGradientStyle({
        background: `linear-gradient(to right, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
      });
    };

    if (pickerRef.current && !picker.current) {
      picker.current = new iro.ColorPicker(pickerRef.current, {
        layout: [
          {
            component: iro.ui.Wheel,
            options: {},
          },
        ],
        colors: ["#f00", "#0f0", "#00f"], // Initial colors for the handles
      });
      picker.current.on("input:end", onChange, { passive: true });
    }
  }, []);

  return (
    <div>
      <div ref={pickerRef}></div>
      <div style={{ height: '10px', marginTop: '10px', ...gradientStyle }}></div>
    </div>
  );
}
