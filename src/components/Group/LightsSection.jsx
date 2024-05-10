import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import Light from "../GroupLight/GroupLight";

const LightsSection = ({ showContainer, group, lights, HOST_IP, api_key }) => {
  return (
    <motion.div className="row colorpicker">
      <AnimatePresence initial={false} mode="wait">
        {showContainer === "lights" && (
          <motion.div
            className="lights"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                opacity: 1,
                height: "auto",
              },
              collapsed: {
                opacity: 0,
                height: 0,
              },
            }}
            transition={{
              duration: 0.1,
            }}
          >
            {group.lights.map((light) => (
              <Light
                HOST_IP={HOST_IP}
                api_key={api_key}
                key={light}
                id={light}
                light={lights[light]}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LightsSection;
