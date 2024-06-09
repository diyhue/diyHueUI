import { BsFillHouseDoorFill } from "react-icons/bs";

import { cieToRgb, colorTemperatureToRgb } from "../ColorFormatConverter/ColorFormatConverter";
import { HueIcons } from "../../static/icons/hass-hue-icons";

import "./gradientIndicator.scss";

const GradientBackground = ({ group, lights }) => {
  const getStyle = () => {
    if (group.state["any_on"]) {
      let lightBg = "linear-gradient(45deg, rgba(200,200,200,1) 0%,";
      let step = 100 / group["lights"].length;
      for (const [index, light] of group.lights.entries()) {
        if (lights[light]["state"]["colormode"] === "xy" && lights[light]["state"]["on"]) {
          lightBg =
            lightBg +
            cieToRgb(
              lights[light]["state"]["xy"][0],
              lights[light]["state"]["xy"][1],
              254
            ) +
            " " +
            Math.floor(step * (index + 1)) +
            "%,";
        } else if (lights[light]["state"]["colormode"] === "ct" && lights[light]["state"]["on"]) {
          lightBg =
            lightBg +
            colorTemperatureToRgb(lights[light]["state"]["ct"]) +
            " " +
            Math.floor(step * (index + 1)) +
            "%,";
        } else if (lights[light]["state"]["on"]){
          lightBg =
            lightBg +
            "rgba(255,212,93,1) " +
            Math.floor(step * (index + 1)) +
            "%,";
        }
      }
      return {
        background: lightBg.slice(0, -1) + ")",
      };
    }
  };

  return (
    <div className="gradient" style={getStyle()}>
      {group["type"] === "Zone" ? (
        <BsFillHouseDoorFill
          style={{ fill: group.state["any_on"] ? "#3a3a3a" : "#ddd" }}
        />
      ) : (
        <HueIcons
          type={"room-" + group.class}
          color={group.state["any_on"] ? "#3a3a3a" : "#ddd"}
        />
      )}
    </div>
  );
};

export default GradientBackground;
