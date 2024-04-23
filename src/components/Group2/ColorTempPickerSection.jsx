import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ColorTempPicker from "../ColorTempPicker/ColorTempPicker";

const ColorTempPickerSection = ({ showContainer, group, lights, HOST_IP, api_key }) => {
  return (
    <AnimatePresence initial={false}>
      {showContainer === "colorTempPicker" && (
        <ColorTempPicker
          group={group}
          lights={lights}
          HOST_IP={HOST_IP}
          api_key={api_key}
        />
      )}
    </AnimatePresence>
  );
};

export default ColorTempPickerSection;