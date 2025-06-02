import axios from "axios";
import { FaMagic } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TiBatteryLow, TiBatteryMid, TiBatteryHigh, TiBatteryFull, } from "react-icons/ti";
import { toast } from "react-hot-toast";
import { Tooltip } from "@mui/material";



import FlipSwitch from "../FlipSwitch/FlipSwitch";
import IconButton from "../IconButton/IconButton";
import GlassContainer from "../GlassContainer/GlassContainer";
import confirmAlert from "../reactConfirmAlert/reactConfirmAlert";
import Battery from "./Battery";

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
    let batteryLevel = battery + "%";
    //console.log(battery);
    if (battery > 90) {
      return <TiBatteryFull color="#27ae60" title={batteryLevel} />;
    } else if (battery > 70) {
      return <TiBatteryHigh color="#1abc9c" title={batteryLevel} />;
    } else if (battery > 40) {
      return <TiBatteryMid color="#e67e22" title={batteryLevel} />;
    } else {
      return <TiBatteryLow color="#e74c3c" title={batteryLevel} />;
    }
  };

  return (
    <GlassContainer>
      <div className="top">
        <div className="row1">
          <div className="icon">
            <FaMagic />
          </div>
          <div className="text">{device["name"]}</div>
          <FlipSwitch
            id={"device " + id}
            onChange={(e) => toggleDevice(e)}
            checked={device["config"]["on"]}
          />
        </div>
        <div className="row2">
          <ul>
            <li>ModelID: {device["modelid"]}</li>
            <li>Type: {device["type"]}</li>
            <li>Protocol: {device["protocol"]}</li>
            <li>Last Active: {device["state"]["lastupdated"].replace(/T|Z|\.\d+/g, " ")}</li>
          </ul>
          </div>
        <div className="row2">
          <Battery battery={device["config"]["battery"]} />
          {/*{"battery" in device["config"] &&
            <Tooltip
              title={<p style={{ fontSize: "18px" }}>{device["config"]["battery"] + "%"}</p>}
              arrow
            >
              <div className="battery">
                {batteryLevel()}
              </div>
            </Tooltip>
          }*/}
          

          <IconButton
            iconName={MdDeleteForever}
            title="Delete"
            size="small"
            color="red"
            onClick={() => deleteAlert()}
          />
        </div>
      </div>
    </GlassContainer>
  );
};

export default Device;
