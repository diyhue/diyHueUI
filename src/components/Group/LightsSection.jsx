import React from 'react';
import Light from "../GroupLight/GroupLight";
import { motion } from "framer-motion";

const LightsSection = ({ showContainer, group, lights, HOST_IP, api_key }) => {
  return (<>
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
          duration: 0.3,
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
  </>);
};

export default LightsSection;