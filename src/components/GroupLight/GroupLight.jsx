import axios from "axios";

import { FaLightbulb } from "react-icons/fa";
import { RiAlertLine } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";

import { cieToRgb, colorTemperatureToRgb } from "../ColorFormatConverter/ColorFormatConverter";
import FlipSwitch from "../FlipSwitch/FlipSwitch";
import BrightnessSlider from "../BrightnessSlider/BrightnessSlider";

const Light = ({ HOST_IP, api_key, id, light }) => {
  const switchLight = (newState) => {
    console.log("Apply state " + JSON.stringify(newState));
    axios.put(`${HOST_IP}/api/${api_key}/lights/${id}/state`, newState);
  };

  const getStyle = () => {
    if (light["state"]["on"]) {
      let lightBg;
      if (light["state"]["colormode"] === "xy") {
        lightBg = cieToRgb(
          light["state"]["xy"][0],
          light["state"]["xy"][1],
          254
        );
      } else if (light["state"]["colormode"] === "ct") {
        lightBg = colorTemperatureToRgb(light["state"]["ct"]);
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
          <FaLightbulb />
        </div>
        <div className="text">
          <p className="name">
            {light.name}{" "}
            {light["state"]["reachable"] || <RiAlertLine title="Unrechable" />}
          </p>
        </div>
        <FlipSwitch
          value={light["state"]["on"]}
          checked={light["state"]["on"]}
          onChange={(e) => switchLight({ on: e })}
        />
      </div>
      <div className="row background">
        <AnimatePresence initial={false}>
          {light["state"]["on"] && (
            <BrightnessSlider
              defaultValue={light["state"]["bri"]}
              onChange={(e) => switchLight({ bri: e })}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Light;
