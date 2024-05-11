import React from "react";

import { FaPalette, FaImages, FaLightbulb } from "react-icons/fa";
import { MdInvertColors } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const ButtonRow = ({
  showContainer,
  setShowContainer,
  lightsCapabilities,
  setSceneModal,
}) => {
  const barIconVariants = {
    opened: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };

  return (
      <AnimatePresence mode="wait">
        {showContainer !== "closed" && (
          <motion.div
            key="buttons"
            className="row buttons"
            initial="closed"
            animate="opened"
            exit="closed"
            variants={barIconVariants}
            transition={{
              duration: 0.2,
            }}
          >
            {lightsCapabilities.includes("xy") && (
              <motion.div
                className={`btn ${showContainer === "colorPicker" ? "active" : ""}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPalette onClick={() => setShowContainer("colorPicker")} />
              </motion.div>
            )}

            {lightsCapabilities.includes("ct") && (
              <motion.div
                className={`btn ${showContainer === "colorTempPicker" ? "active" : ""}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <MdInvertColors
                  onClick={() => setShowContainer("colorTempPicker")}
                />
              </motion.div>
            )}

            <motion.div
              className={"btn"}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaImages onClick={() => setSceneModal(true)} />
            </motion.div>

            <motion.div
              className={`btn ${showContainer === "lights" ? "active" : ""}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLightbulb onClick={() => setShowContainer("lights")} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );
};

export default ButtonRow;
