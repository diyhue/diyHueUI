import React from 'react';
import ColorTempPicker from "../ColorTempPicker/ColorTempPicker";
import { motion } from "framer-motion";

const ColorTempPickerSection = ({ showContainer, group, lights, HOST_IP, api_key }) => {
  return (<>
      {showContainer === "colorTempPicker" && (
        <motion.section
        key="content"
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: {
            opacity: 1,
            height: "auto",
            scale: 1,
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
        <ColorTempPicker
          group={group}
          lights={lights}
          HOST_IP={HOST_IP}
          api_key={api_key}
        />
        </motion.section>
      )}
  </>);
};

export default ColorTempPickerSection;