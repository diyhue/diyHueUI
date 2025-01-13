import React, { useRef, useEffect, useState } from "react";
import iro from "@jaames/iro";
import './gradientColorpicker.scss';

export default function GradientColorpicker() {
  const pickerRef = useRef(null);
  const picker = useRef(null);
  const [gradientStyle, setGradientStyle] = useState({});

  useEffect(() => {
    const interpolateColor = (color1, color2, factor) => {
      const result = color1.slice(1).match(/.{2}/g).map((hex, i) => {
        return Math.round(parseInt(hex, 16) + factor * (parseInt(color2.slice(1).match(/.{2}/g)[i], 16) - parseInt(hex, 16)));
      });
      return `#${result.map(value => value.toString(16).padStart(2, '0')).join('')}`;
    };

    const onChange = () => {
      const colors = picker.current.colors.map(color => color.hexString);
      const interpolatedColors = [
        colors[0],
        interpolateColor(colors[0], colors[1], 0.5),
        colors[1],
        interpolateColor(colors[1], colors[2], 0.5),
        colors[2]
      ];
      const gradient = {
        colors: interpolatedColors,
      };
      console.log(gradient);
      const activeColor = picker.current.color.hexString;
      const activeColorIndex = picker.current.colors.findIndex(color => color.hexString === activeColor);
      console.log("Active color:", activeColor, "at position:", activeColorIndex);


      // Update gradient style
      setGradientStyle({
        background: `linear-gradient(to right, ${interpolatedColors.join(', ')})`,
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
      <div className="gradientDisplay" style={{  ...gradientStyle }}></div>
    </div>
  );
}
