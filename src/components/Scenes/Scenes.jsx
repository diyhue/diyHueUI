import axios from "axios";

import { cieToRgb, colorTemperatureToRgb } from "../ColorFormatConverter/ColorFormatConverter";
import nightsky from "../../static/images/nightsky.webp";
import Wizard from "../Wizard/Wizard";

import "./scenes.scss";

const Scenes = ({
  HOST_IP,
  api_key,
  groupId,
  group,
  scenes,
  sceneModal,
  setSceneModal,
}) => {
  const applyScene = (scene) => {
    axios.put(`${HOST_IP}/api/${api_key}/groups/0/action`, { scene: scene });
  };

  const applyLightState = (light, state) => {
    axios.put(`${HOST_IP}/api/${api_key}/lights/${light}/state`, state);
  };

  function closeModal() {
    setSceneModal(false);
  }

  const getStyle = (lightstate) => {
    let color;
    if ("xy" in lightstate) {
      color = cieToRgb(lightstate["xy"][0], lightstate["xy"][1], 254);
    } else if ("ct" in lightstate) {
      color = colorTemperatureToRgb(lightstate["ct"]);
    } else {
      color = "rgba(200,200,200,1)";
    }
    return color;
  };

  return (
    <Wizard
      isOpen={sceneModal}
      closeWizard={closeModal}
      headline={"Scene Picker for " + group.name}
    >
      {Object.entries(scenes)
        .filter((scene) => scene[1].group === groupId)
        .map(([id, scene]) => (
          <div
            key={id}
            className="scene"
            style={{
              background: `url(${nightsky})`,
              backgroundSize: "300px 125px",
            }}
            onClick={() => applyScene(id)}
          >
            <div className="dimmer">
              {Object.entries(scene.lightstates)
                .filter((item, index) => index < 5)
                .map(([light, state]) => (
                  <div
                    key={light}
                    className="color"
                    style={{ background: `${getStyle(state)}` }}
                    onClick={() => applyLightState(light, state)}
                  ></div>
                ))}
              <div className="name">{scene.name}</div>
            </div>
            <div className="dynamiccontrol">
              <i className="far fa-play-circle"></i>
            </div>
          </div>
        ))}
    </Wizard>
  );
};

export default Scenes;
