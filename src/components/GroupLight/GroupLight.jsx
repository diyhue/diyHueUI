import axios from "axios";
import { useEffect, useState } from "react";

import { RiAlertLine } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";

import { cieToRgb, colorTemperatureToRgb } from "../ColorFormatConverter/ColorFormatConverter";
import FlipSwitch from "../FlipSwitch/FlipSwitch";
import BrightnessSlider from "../BrightnessSlider/BrightnessSlider";
import { HueIcons } from "../../static/icons/hass-hue-icons";

const Light = ({ HOST_IP, api_key, id, light }) => {
  const [lightState, setLightState] = useState(light);
  console.log("Light state: ", lightState);

  useEffect(() => {
    setLightState(light);
  }, [light]);

  const switchLight = (newState) => {
    axios.put(`${HOST_IP}/api/${api_key}/lights/${id}/state`, newState)
      .then((response) => {
        setLightState((prevState) => ({
          ...prevState,
          state: { ...prevState.state, ...newState }
        }));
      })
      .catch((error) => {
        console.error("Error updating light state:", error);
      });
  };

  const getStyle = () => {
    if (lightState["state"]["on"]) {
      let lightBg;
      if (lightState["state"]["colormode"] === "xy") {
        lightBg = cieToRgb(
          lightState["state"]["xy"][0],
          lightState["state"]["xy"][1],
          254
        );
      } else if (lightState["state"]["colormode"] === "ct") {
        lightBg = colorTemperatureToRgb(lightState["state"]["ct"]);
      } else {
        lightBg = "rgba(255,212,93,1)";
      }
      return { background: lightBg };
    }
  };

  return (
    <div className="groupCard light">
      <div className="row top">
        <div className="gradient" style={getStyle()}>
          <HueIcons
            type={"light-" + lightState["config"]["archetype"]}
            color="#eeeeee"
          />
        </div>
        <div className="text">
          <p className="name">
            {lightState.name}{" "}
            {lightState["state"]["reachable"] || <RiAlertLine title="Unreachable" />}
          </p>
        </div>
        <FlipSwitch
          id={"light " + id}
          value={lightState["state"]["on"]}
          checked={lightState["state"]["on"]}
          onChange={(e) => switchLight({ on: e })}
        />
      </div>
      <div className="row background">
        <AnimatePresence initial={false}>
          {lightState["state"]["on"] && (
            <BrightnessSlider
              defaultValue={(lightState["state"]["bri"] / 254) * 100}
              onChange={(e) => switchLight({ bri: e })}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Light;
