import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import ColorTempPicker from "../ColorTempPicker/ColorTempPicker";

const ColorTempPickerSection = ({
  showContainer,
  group,
  groupId,
  HOST_IP,
  api_key,
}) => {
  return (
    <motion.div className="row colorpicker">
      <AnimatePresence initial={false} mode="wait">
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
                scale: 0.5,
                height: 0,
              },
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <ColorTempPicker
              group={group}
              groupId={groupId}
              HOST_IP={HOST_IP}
              api_key={api_key}
            />
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ColorTempPickerSection;
