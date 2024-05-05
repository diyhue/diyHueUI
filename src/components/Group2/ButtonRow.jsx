import React from 'react';
import { motion } from "framer-motion";
import { FaPalette, FaImages, FaLightbulb } from "react-icons/fa";
import { MdInvertColors } from "react-icons/md";

const ButtonRow = ({ showContainer, setShowContainer, lightsCapabilities, setSceneModal }) => {

  const barIconVariants = {
    opened: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };

  return (<>
    {showContainer !== "closed" && (
      <motion.div
        className="row buttons"
        initial="closed"
        animate={showContainer === "closed" ? "closed" : "opened"}
        variants={barIconVariants}
      >
        {lightsCapabilities.includes("xy") && (
          <motion.div
            className={"btn"}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            variants={barIconVariants}
          >
            <FaPalette onClick={() => setShowContainer("colorPicker")} />
          </motion.div>
        )}

        {lightsCapabilities.includes("ct") && (
          <motion.div
            className={"btn"}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <MdInvertColors onClick={() => setShowContainer("colorTempPicker")} />
          </motion.div>
        )}

        <motion.div
          className="btn"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaImages onClick={() => setSceneModal(true)} />
        </motion.div>

        <motion.div
          className="btn"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaLightbulb onClick={() => setShowContainer("lights")} />
        </motion.div>
      </motion.div>
    )}
  </>);
};

export default ButtonRow;