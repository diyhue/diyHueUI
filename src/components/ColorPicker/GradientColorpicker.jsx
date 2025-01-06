import React, { useRef, useEffect } from "react";
import iro from "@jaames/iro";

export default function GradientColorpicker() {
  const pickerRef = useRef(null);
  const picker = useRef(null);

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

      // Update handle styles
      const handles = document.querySelectorAll('.IroHandle');
      handles.forEach((handle, index) => {
        const circleElement = handle.querySelector('circle:nth-child(2)');
        if (handle.classList.contains('IroHandle--isActive')) {
          circleElement.setAttribute('stroke', '#000');
        } else {
          circleElement.setAttribute('stroke', '#fff');
        }
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

  return <div ref={pickerRef}></div>;
}
