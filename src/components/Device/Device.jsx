import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; 
import { FaMagic } from "react-icons/fa";
import { TiBatteryLow, TiBatteryMid, TiBatteryHigh, TiBatteryFull, } from "react-icons/ti";
import { toast } from "react-hot-toast";

import FlipSwitch from "../FlipSwitch/FlipSwitch";
import IconButton from "../IconButton/IconButton";
import GlassContainer from "../GlassContainer/GlassContainer";

import "react-confirm-alert/src/react-confirm-alert.css";
import "./device.scss";

const Device = ({ HOST_IP, api_key, id, device }) => {
  const deleteAlert = () => {
    confirmAlert({
      title: "Delete device " + device["name"],
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteDevice(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteDevice = () => {
    axios
      .delete(`${HOST_IP}/api/${api_key}/sensors/${id}`)
      .then((fetchedData) => {
        //console.log(fetchedData.data);
        toast.success("Device successfully deleted");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error occured, check browser console");
      });
  };

  const toggleDevice = (state) => {
    axios
      .put(`${HOST_IP}/api/${api_key}/sensors/${id}/config`, { on: state })
      .then((fetchedData) => {
        //console.log(fetchedData.data);
        toast.success(
          device["name"] + " successfully " + (state ? "enabled" : "disabled")
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error occured, check browser console");
      });
  };

  const batteryLevel = () => {
    let battery = device["config"]["battery"];
    let battryLevel = battery + "%";
    //console.log(battery);
    if (battery > 90) {
      return <TiBatteryFull color="#27ae60" title={battryLevel} />;
    } else if (battery > 70) {
      return <TiBatteryHigh color="#1abc9c" title={battryLevel} />;
    } else if (battery > 40) {
      return <TiBatteryMid color="#e67e22" title={battryLevel} />;
    } else {
      return <TiBatteryLow color="#e74c3c" title={battryLevel} />;
    }
  };

  return (
    <GlassContainer>
      <div className="device">
        <div className="row1">
          <div className="icon">
            <FaMagic />
          </div>
          <div className="text">{device["name"]}</div>
          <FlipSwitch
            onChange={(e) => toggleDevice(e)}
            defaultChecked={device["config"]["on"]}
          />
        </div>
        <div className="row2">
          <div className="text">
            ModelID: {device["modelid"]} <br />
            Type: {device["type"]} <br />
            Protocol: {device["protocol"]} <br />
          </div>
        </div>
        <div className="row3">
          <div className="battery">
            {"battery" in device["config"] && batteryLevel()}
          </div>

          <IconButton
            iconName="MdDeleteForever"
            title="Delete"
            color="red"
            onClick={() => deleteAlert()}
          />
        </div>
      </div>
    </GlassContainer>
  );
};

export default Device;
