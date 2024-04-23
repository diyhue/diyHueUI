import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ColorPicker from "../ColorPicker/ColorPicker";

const ColorPickerSection = ({ showContainer, group, lights, HOST_IP, api_key }) => {
  return (
    <AnimatePresence initial={false}>
      {showContainer === "colorPicker" && (
        <ColorPicker
          group={group}
          lights={lights}
          HOST_IP={HOST_IP}
          api_key={api_key}
        />
      )}
    </AnimatePresence>
  );
};

export default ColorPickerSection;