/*import React, { useState } from 'react';
import GroupHeader from './GroupHeader';
import ButtonRow from './ButtonRow';
import ColorPickerSection from './ColorPickerSection';
import ColorTempPickerSection from './ColorTempPickerSection';
import LightsSection from './LightsSection';
import axios from 'axios';


const Group = ({ group, lights, HOST_IP, api_key }) => {
  const [showContainer, setShowContainer] = useState("closed");
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

  const handleToggleChange = (state) => {
    const newState = {
      on: state,
    };
    group.state["any_on"] = state;
    if (!state) setShowContainer("closed");
    //console.log("Apply state " + JSON.stringify(newState));
    axios.put(`${HOST_IP}/api/${api_key}/groups/${id}/action`, newState);
  };

  const handleBriChange = (state) => {
    group.action["bri"] = state;
    const newState = {
      bri: state,
    };
    //console.log("Apply state " + JSON.stringify(newState));
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

  

  return (
    <div>
      <GroupHeader
        group={group}
        lights={lights}
        HOST_IP={HOST_IP}
        api_key={api_key}
        showContainer={showContainer}
        setShowContainer={setShowContainer}
        handleToggleChange={handleToggleChange}
        handleBriChange={handleBriChange}
        statusLights={statusLights}
        defaultContainerView={defaultContainerView}
      />
      <ButtonRow
        showContainer={showContainer}
        setShowContainer={setShowContainer}
        lightsCapabilities={lightsCapabilities}
        defaultContainerView={defaultContainerView}
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
        lights={lights}
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
    </div>
  );
};

export default Group;*/