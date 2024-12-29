import React, { useCallback } from "react";

import axios from "axios";
import debounce from "lodash.debounce";
import { AnimatePresence } from "framer-motion";

import BrightnessSlider from "../BrightnessSlider/BrightnessSlider";
import FlipSwitch from "../FlipSwitch/FlipSwitch";
import GradientIndicator from "../GradientIndicator/GradientIndicator";


const GroupHeader = ({ HOST_IP, api_key, id, group, lights }) => {
  const handleToggleChange = (state) => {
    const newState = {
      on: state,
    };
    group.state["any_on"] = state;
    axios.put(`${HOST_IP}/api/${api_key}/groups/${id}/action`, newState);
  };

  const handleBriChange = (state) => {
    group.action["bri"] = state;
    const newState = {
      bri: state,
    };
    axios.put(`${HOST_IP}/api/${api_key}/groups/${id}/action`, newState);
  };

  const statusLights = () => {
    let onLights = 0;
    let offLights = 0;
    for (const light of group.lights) {
      if (lights[light]["state"]["on"] === true) onLights = onLights + 1;
      else offLights = offLights + 1;
    }
    if (onLights === 0) {
      return "All lights off";
    } else if (offLights === 0) {
      return "All lights on";
    } else {
      return onLights + " lights on";
    }
  };

  const debouncedHandleBriChange = debounce(handleBriChange, 300);

  const debouncedChangeHandler = useCallback(
    (value) => {
      debouncedHandleBriChange(value);
    },
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <div className="row top">
        <GradientIndicator group={group} lights={lights} />
        <div className="text">
          <p className="name"> {group.name} </p>
          <p className="subtext">{statusLights()}</p>
        </div>
        <div className="flipSwitch">
          <FlipSwitch
            id={"group " + id}
            value={group.state["any_on"]}
            onChange={(e) => handleToggleChange(e)}
            checked={group.state["any_on"]}
          />
        </div>
      </div>
      <div className="row background">
        <AnimatePresence initial={false}>
          {group.state["any_on"] && (
            <BrightnessSlider
              defaultValue={group.state["avr_bri"]}
              onChange={debouncedChangeHandler}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default GroupHeader;
