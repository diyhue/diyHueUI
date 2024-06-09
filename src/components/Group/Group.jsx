import React, { useState } from "react";

import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import ButtonRow from "./ButtonRow";
import ColorPickerSection from "./ColorPickerSection";
import ColorTempPickerSection from "./ColorTempPickerSection";
import GroupHeader from "./GroupHeader";
import LightsSection from "./LightsSection";
import Scenes from "../Scenes/Scenes";

import "./group.scss";

const Group = ({ HOST_IP, api_key, id, group, lights, scenes }) => {
  const [showContainer, setShowContainer] = useState("closed");
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
      } else if (lightsCapabilities.includes("ct")) {
        setShowContainer("colorTempPicker");
      } else {
        setShowContainer("lights");
      }
    } else {
      setShowContainer("closed");
    }
  };

  return (
    <div className="groupCard">
      <Scenes
        HOST_IP={HOST_IP}
        api_key={api_key}
        groupId={id}
        group={group}
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
        />

        <ColorPickerSection
          showContainer={showContainer}
          group={group}
          lights={lights}
          HOST_IP={HOST_IP}
          api_key={api_key}
        />
        <ColorTempPickerSection
          showContainer={showContainer}
          group={group}
          groupId={id}
          HOST_IP={HOST_IP}
          api_key={api_key}
        />
        <LightsSection
          showContainer={showContainer}
          group={group}
          lights={lights}
          HOST_IP={HOST_IP}
          api_key={api_key}
        />
      </LayoutGroup>

      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
};

export default Group;
