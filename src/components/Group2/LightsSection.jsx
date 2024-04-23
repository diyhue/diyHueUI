import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Light from "../GroupLight/GroupLight";

const LightsSection = ({ showContainer, group, lights, HOST_IP, api_key }) => {
    return (
      <AnimatePresence initial={false}>
        {showContainer === "lights" && (
          <div>
            {group.lights.map((light) => (
              <Light
                HOST_IP={HOST_IP}
                api_key={api_key}
                key={light}
                id={light}
                light={lights[light]}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    );
  };

export default LightsSection;