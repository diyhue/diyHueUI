import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import ColorPicker from "../ColorPicker/ColorPicker";

const ColorPickerSection = ({
  showContainer,
  group,
  lights,
  HOST_IP,
  api_key,
}) => {
  return (
    <motion.div className="row colorpicker">
      <AnimatePresence initial={false} mode="wait">
        {showContainer === "colorPicker" && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                opacity: 1,
                scale: 1,
                height: "auto",
              },
              collapsed: {
                opacity: 0,
                scale: 0.5,
                height: 0,
              },
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <ColorPicker
              group={group}
              lights={lights}
              HOST_IP={HOST_IP}
              api_key={api_key}
              groupLights={group.lights}
            />
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ColorPickerSection;
