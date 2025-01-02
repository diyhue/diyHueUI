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
  console.log(Behavior);
  const [WizardIsOpen, setWizardIsOpen] = useState(false);

  const openWizard = () => {
    setWizardIsOpen(true);
  };

  const closeWizard = (save = false) => {
    if (save) {
      console.log("Close wizard and save");
      setWizardIsOpen(false);
    } else {
      console.log("Close wizard without saving");
      confirmAlert({
        title: "Confirm to close",
        message: "You have unsaved changes. Are you sure you want to close?",
        buttons: [
          {
            label: "Yes",
            onClick: () => setWizardIsOpen(false),
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    }
  };

  const types = {
    "ff8957e3-2eb9-4699-a0c8-ad2cb3ede704": "Wake Up",
    "7e571ac6-f363-42e1-809a-4cbf6523ed72": "Go To Sleep",
    "7238c707-8693-4f19-9095-ccdc1444d228": "Activate Scene",
    "e73bc72d-96b1-46f8-aa57-729861f80c78": "Countdown Timer",
  };

  const getTime = () => {
    const { when, when_extended, duration } = Behavior["configuration"];
    const timePoint = when?.["time_point"];
    const timeExtended = when_extended?.["start_at"]?.["time_point"];

    const formatTime = (hour, minute, second) => 
      new Date(((hour * 3600) + (minute * 60) + second) * 1000).toISOString().substring(11, 19);

    const getTimePoint = (point) => {
      if (!point) return "";
      switch (point["type"]) {
        case "time":
          return formatTime(point["time"]["hour"], point["time"]["minute"], 0);
        case "sunrise":
          return "Sunrise";
        case "sunset":
          return "Sunset";
        default:
          return "";
      }
    };

    switch (Behavior["script_id"]) {
      case "ff8957e3-2eb9-4699-a0c8-ad2cb3ede704":
      case "7e571ac6-f363-42e1-809a-4cbf6523ed72":
        return getTimePoint(timePoint);
      case "7238c707-8693-4f19-9095-ccdc1444d228":
        return getTimePoint(timeExtended);
      case "e73bc72d-96b1-46f8-aa57-729861f80c78":
        return formatTime(0, 0, duration?.["seconds"])
      default:
        return "";
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
        closeWizard={() => closeWizard(false)}
        headline="Edit Behavior"
      >
        <Edit_behavior
          HOST_IP={HOST_IP}
          API_KEY={API_KEY}
          Behavior_item={Behavior}
          closeWizard={closeWizard}
        ></Edit_behavior>
      </Wizard>
    </>
  );
};

export default Map_Behavior;
