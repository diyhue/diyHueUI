import React from 'react';
import { FaPalette, FaImages, FaLightbulb } from "react-icons/fa";
import { MdInvertColors } from "react-icons/md";

const ButtonRow = ({ showContainer, setShowContainer, lightsCapabilities }) => {
  return (
    <div className="buttonRow">
      {lightsCapabilities.includes("xy") && (
        <FaPalette
          className={showContainer === "color" ? "active" : ""}
          onClick={() => setShowContainer("color")}
        />
      )}
      {lightsCapabilities.includes("ct") && (
        <MdInvertColors
          className={showContainer === "temp" ? "active" : ""}
          onClick={() => setShowContainer("temp")}
        />
      )}
      <FaImages
        className={showContainer === "scenes" ? "active" : ""}
        onClick={() => setShowContainer("scenes")}
      />
      <FaLightbulb
        className={showContainer === "lights" ? "active" : ""}
        onClick={() => setShowContainer("lights")}
      />
    </div>
  );
};

export default ButtonRow;