import axios from "axios";
import { FaMagic } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";


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
