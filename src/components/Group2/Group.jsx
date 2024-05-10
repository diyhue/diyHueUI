import React, { useState } from "react";

import { FaChevronDown } from "react-icons/fa";
import { motion, LayoutGroup } from "framer-motion";

import ButtonRow from "./ButtonRow";
import GroupHeader from "./GroupHeader";
import Color from "./color";
import Scenes from "../Scenes/Scenes";

import "./group.scss";

const Group = ({ HOST_IP, api_key, id, group, lights, scenes }) => {
  const [showContainer, setShowContainer] = useState("closed");
  const [direction, setdirection] = useState(1);
  const [sceneModal, setSceneModal] = useState(false);
  const [lightsCapabilities, setLightsCapabilities] = useState([]);

  // Include the functions inspectLightsCapabilities, defaultContainerView, handleToggleChange, handleBriChange, statusLights here
  const inspectLightsCapabilities = () => {
    for (const light of group.lights) {
      if (
        "xy" in lights[light]["state"] &&
        !lightsCapabilities.includes("xy")
      ) {
        setLightsCapabilities([...lightsCapabilities, "xy"]);
      }
      if (
        "ct" in lights[light]["state"] &&
        !lightsCapabilities.includes("ct")
      ) {
        setLightsCapabilities([...lightsCapabilities, "ct"]);
      }
    }
  };
  inspectLightsCapabilities();
  //lightsCapabilities);

  const defaultContainerView = () => {
    if (showContainer === "closed") {
      if (lightsCapabilities.includes("xy")) {
        setShowContainer("colorPicker");
        setdirection(1);
      } else if (lightsCapabilities.includes("ct")) {
        setShowContainer("colorTempPicker");
        setdirection(1);
      } else {
        setShowContainer("lights");
        setdirection(1);
      }
    } else {
      setShowContainer("closed");
      setdirection(1);
    }
  };

  return (
    <div className="groupCard">
      <Scenes
        HOST_IP={HOST_IP}
        api_key={api_key}
        groupId={id}
        scenes={scenes}
        sceneModal={sceneModal}
        setSceneModal={setSceneModal}
      />

      <LayoutGroup>
        <GroupHeader
          group={group}
          lights={lights}
          HOST_IP={HOST_IP}
          api_key={api_key}
          id={id}
        />

        <ButtonRow
          defaultContainerView={defaultContainerView}
          showContainer={showContainer}
          setShowContainer={setShowContainer}
          lightsCapabilities={lightsCapabilities}
          setSceneModal={setSceneModal}
          setdirection={setdirection}
        />

        <Color
          showContainer={showContainer}
          direction={direction}
          group={group}
          lights={lights}
          HOST_IP={HOST_IP}
          api_key={api_key}
        />

        <div className="row bottom">
          <motion.div
            className="expandbtn"
            initial="collapsed"
            animate={showContainer === "closed" ? "collapsed" : "open"}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            variants={{
              open: {
                rotate: 180,
              },
              collapsed: {
                rotate: 0,
              },
            }}
            transition={{
              duration: 0.3,
            }}
            onClick={() => defaultContainerView()}
          >
            <FaChevronDown />
          </motion.div>
        </div>
      </LayoutGroup>
    </div>
  );
};

export default Group;
