import { useState, useEffect } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { MdEditNotifications } from "react-icons/md";
import { Tooltip } from "@mui/material";

import GlassContainer from "../GlassContainer/GlassContainer";
import { HueIcons } from "../../static/icons/hass-hue-icons";
import IconButton from "../IconButton/IconButton";
import Wizard from "../Wizard/Wizard";
import Edit_behavior from "./Edit_behavior";
import FlipSwitch from "../FlipSwitch/FlipSwitch";

import "react-confirm-alert/src/react-confirm-alert.css";

const Map_Behavior = ({ HOST_IP, API_KEY, id, Behavior }) => {
    const [WizardIsOpen, setWizardIsOpen] = useState(false);
  
    const openWizard = () => {
      setWizardIsOpen(true);
    };
  
    const closeWizard = () => {
      setWizardIsOpen(false);
    };

  const types = {
    "ff8957e3-2eb9-4699-a0c8-ad2cb3ede704": "Wake Up",
    "7e571ac6-f363-42e1-809a-4cbf6523ed72": "Go To Sleep",
    "7238c707-8693-4f19-9095-ccdc1444d228": "Activate Scene",
    "e73bc72d-96b1-46f8-aa57-729861f80c78": "Countdown Timer",
  };

  const getTime = () => {
    if (Behavior["script_id"] === "ff8957e3-2eb9-4699-a0c8-ad2cb3ede704") {
      if (Behavior["configuration"]["when"]["time_point"]["type"] === "time") {
        return Behavior["configuration"]["when"]["time_point"]["time"]["hour"] + ":" + (Behavior["configuration"]["when"]["time_point"]["time"]["minute"] < 2 ? "0" + Behavior["configuration"]["when"]["time_point"]["time"]["minute"] : Behavior["configuration"]["when"]["time_point"]["time"]["minute"]);
      }
      if (Behavior["configuration"]["when"]["time_point"]["type"] === "sunrise") {
        return "Sunrise";
      }
    }
    if (Behavior["script_id"] === "7e571ac6-f363-42e1-809a-4cbf6523ed72") {
      if (Behavior["configuration"]["when"]["time_point"]["type"] === "time") {
        return Behavior["configuration"]["when"]["time_point"]["time"]["hour"] + ":" + (Behavior["configuration"]["when"]["time_point"]["time"]["minute"] < 2 ? "0" + Behavior["configuration"]["when"]["time_point"]["time"]["minute"] : Behavior["configuration"]["when"]["time_point"]["time"]["minute"]);
      }
      if (Behavior["configuration"]["when"]["time_point"]["type"] === "sunset") {
        return "Sunset";
      }
    }
    if (Behavior["script_id"] === "7238c707-8693-4f19-9095-ccdc1444d228"){
      if (Behavior["configuration"]["when_extended"]["start_at"]["time_point"]["type"] === "time") {
        return Behavior["configuration"]["when_extended"]["start_at"]["time_point"]["hour"] + ":" + (Behavior["configuration"]["when_extended"]["start_at"]["time_point"]["minute"] < 2 ? "0" + Behavior["configuration"]["when_extended"]["start_at"]["time_point"]["minute"] : Behavior["configuration"]["when_extended"]["start_at"]["time_point"]["minute"]);
      }
      if (Behavior["configuration"]["when_extended"]["start_at"]["time_point"]["type"] === "sunrise") {
        return "Sunrise";
      }
      if (Behavior["configuration"]["when_extended"]["start_at"]["time_point"]["type"] === "sunset") {
        return "Sunset";
      }
    }
    if (Behavior["script_id"] === "e73bc72d-96b1-46f8-aa57-729861f80c78") {
      return new Date(Behavior["configuration"]["duration"]["seconds"] * 1000).toISOString().substring(11, 11 + 8);
    }
  }

  const handleToggleChange = (e) => {
    axios
      .put(
        `${HOST_IP}/clip/v2/resource/behavior_instance/${id}`,
        { stateSelection: e.target.checked ? "Enabled" : "Disabled" },
        {
          headers: {
            "hue-application-key": API_KEY,
          },
        }
      )
      .then((response) => {
        console.log("Behavior saved:", response.data);
        toast.success("Behavior saved successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  }
  

  return (
    <>
      <GlassContainer>
        <div className="top">
          <div className="row1">
            <div className="hueicon">
              <HueIcons type={Behavior["script_id"]} color="#eeeeee" />
            </div>
            <div className="text">{Behavior["metadata"]["name"]}</div>
            <div className="flipSwitch">
              <FlipSwitch
                id={"script " + id}
                value={Behavior["enabled"]}
                onChange={(e) => handleToggleChange(e)}
                checked={Behavior["enabled"]}
              />
            </div>
          </div>
          <div className="row2">
            <ul>
              <li>Type: {types[Behavior["script_id"]]}</li>
              <li>Time: {getTime()}</li>
            </ul>
            <IconButton
              iconName={MdEditNotifications}
              title="Edit Behavior"
              size="small"
              color="blue"
              onClick={openWizard}
            />
          </div>
        </div>
      </GlassContainer>
      <Wizard
        isOpen={WizardIsOpen}
        closeWizard={closeWizard}
        headline="Add Behaviors"
      >
        <Edit_behavior
          HOST_IP={HOST_IP}
          API_KEY={API_KEY}
          closeWizard={closeWizard}
        ></Edit_behavior>
      </Wizard>
    </>
  );
};

export default Map_Behavior;
