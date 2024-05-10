import React from "react";

import { FaPalette, FaImages, FaLightbulb } from "react-icons/fa";
import { MdInvertColors } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const ButtonRow = ({
  showContainer,
  setShowContainer,
  lightsCapabilities,
  setSceneModal,
  setdirection,
}) => {
  const barIconVariants = {
    opened: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  };

  const nametonumber = (page) => {
    console.log("nametonumber: " + page)
    if (page === "colorPicker"){
      console.log("return 1")
      return 1
    }
    else if (page === "colorTempPicker"){
      console.log("return 2")
      return 2
    }
    else if (page === "lights"){
      console.log("return 3")
      return 3
    }
    else {
      console.log("nametonumber error")
    }
  }

  const paginate = (new_page) => {
    if (nametonumber(new_page) < nametonumber(showContainer)) {
      setShowContainer(new_page);
      setdirection(-1);
    } else if (nametonumber(new_page) > nametonumber(showContainer)) {
      setShowContainer(new_page);
      setdirection(1);
    }
  };

  return (
    <AnimatePresence initial={false} mode="wait">
      {showContainer !== "closed" && (
        <motion.div
          key="ButtonRow"
          className="row buttons"
          initial="closed"
          animate="opened"
          exit="closed"
          variants={barIconVariants}
          transition={{
            duration: 0.3,
          }}
        >

          {lightsCapabilities.includes("xy") && (
            <motion.div
              className={"btn"}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaPalette onClick={() => paginate("colorPicker")} />
            </motion.div>
          )}

          {lightsCapabilities.includes("ct") && (
            <motion.div
              className={"btn"}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <MdInvertColors
                onClick={() => paginate("colorTempPicker")}
              />
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
            <FaLightbulb onClick={() => paginate("lights")} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ButtonRow;
