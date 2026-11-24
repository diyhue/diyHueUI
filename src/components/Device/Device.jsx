import axios from "axios";
import {
  FaMagic,
  FaWalking,
  FaThermometerHalf,
  FaSun,
  FaDoorClosed,
  FaHandPointer,
  FaSyncAlt,
  FaPlug,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import FlipSwitch from "../FlipSwitch/FlipSwitch";
import { toast } from "react-hot-toast";


import IconButton from "../IconButton/IconButton";
import GlassContainer from "../GlassContainer/GlassContainer";
import confirmAlert from "../reactConfirmAlert/reactConfirmAlert";
import Battery from "./Battery";

const Device = ({ HOST_IP, api_key, id, device }) => {
  // One icon per sensor kind so the cards are distinguishable at a glance.
  const sensorIcon = () => {
    switch (device["type"]) {
      case "ZLLPresence":
        return FaWalking;
      case "ZLLTemperature":
        return FaThermometerHalf;
      case "ZLLLightLevel":
        return FaSun;
      case "CLIPOpenClose":
        return FaDoorClosed;
      case "ZLLSwitch":
      case "ZGPSwitch":
        return FaHandPointer;
      case "ZLLRelativeRotary":
        return FaSyncAlt;
      case "ZLLOnOffPlugInUnit":
        return FaPlug;
      default:
        return FaMagic;
    }
  };

  // Show the values a sensor actually reports. Presence sensors carry
  // presence, temperature carries temperature/100, light level sensors carry
  // lightlevel/dark/daylight and switches report a buttonevent.
  const sensorValues = () => {
    const state = device["state"] || {};
    const values = [];
    if ("presence" in state) {
      values.push([
        "Presence",
        state["presence"] === null ? "unknown" : state["presence"] ? "motion" : "no motion",
      ]);
    }
    if ("temperature" in state && typeof state["temperature"] === "number") {
      values.push(["Temperature", (state["temperature"] / 100).toFixed(1) + " °C"]);
    }
    if ("lightlevel" in state && typeof state["lightlevel"] === "number") {
      // Hue light level -> lux: lux = 10^((lightlevel - 1) / 10000)
      values.push(["Illuminance", Math.round(Math.pow(10, (state["lightlevel"] - 1) / 10000)) + " lx"]);
    }
    if ("dark" in state) values.push(["Dark", state["dark"] ? "yes" : "no"]);
    if ("daylight" in state) values.push(["Daylight", state["daylight"] ? "yes" : "no"]);
    if ("open" in state) {
      values.push(["Open", state["open"] ? "yes" : "no"]);
    }
    if (typeof state["power"] === "number") values.push(["Power", state["power"] + " W"]);
    if (typeof state["voltage"] === "number") values.push(["Voltage", state["voltage"] + " V"]);
    if (typeof state["current"] === "number") values.push(["Current", state["current"] + " A"]);
    if (typeof state["energy"] === "number") values.push(["Energy", state["energy"] + " kWh"]);

    if ("buttonevent" in state && state["buttonevent"]) {
      values.push(["Buttonevent", state["buttonevent"]]);
    }
    return values;
  };

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

  const togglePlugPower = (on) => {
    axios
      .put(`${HOST_IP}/api/${api_key}/lights/${String(id).replace("plug-", "")}/state`, { on })
      .then(() => toast.success(device["name"] + (on ? " on" : " off")))
      .catch(() => toast.error("Error occured, check browser console"));
  };

  const toggleChildLock = (locked) => {
    axios
      .put(`${HOST_IP}/api/${api_key}/lights/${String(id).replace("plug-", "")}/state`, {
        childlock: locked,
      })
      .then(() => {
        device.state.childlock = locked;
        toast.success(device["name"] + (locked ? " locked" : " unlocked"));
      })
      .catch(() => {
        toast.error("Error occured, check browser console");
      });
  };

  const toggleDevice = (state) => {
    axios
      .put(`${HOST_IP}/api/${api_key}/sensors/${id}/config`, { on: state })
      .then(() => {
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
            {(() => {
              const Icon = sensorIcon();
              return <Icon />;
            })()}
          </div>
          <div className="text">{device["name"]}</div>
          {device["type"] === "ZLLOnOffPlugInUnit" && (
            <FlipSwitch
              id={"power-" + id}
              onChange={(on) => togglePlugPower(on)}
              checked={!!(device["state"] || {})["on"]}
            />
          )}
          {(device["type"] === "ZLLSwitch" || device["type"] === "ZGPSwitch") && (
            <FlipSwitch
              id={"device " + id}
              onChange={(e) => toggleDevice(e)}
              checked={device?.["config"]?.["on"] ?? false}
            />
          )}
        </div>
        {device["type"] === "ZLLOnOffPlugInUnit" && (
          <div
            className="row2"
            style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" }}
          >
            <span>Child lock</span>
            <div style={{ transform: "scale(0.75)", transformOrigin: "left center" }}>
              <FlipSwitch
                id={"childlock-" + id}
                onChange={(locked) => toggleChildLock(locked)}
                checked={!!(device["state"] || {})["childlock"]}
              />
            </div>
          </div>
        )}
        <div className="row2">
          <ul>
            <li>ModelID: {device["modelid"]}</li>
            <li>Type: {device["type"]}</li>
            <li>Protocol: {device["protocol"]}</li>
            <li>
              Last Active:{" "}
              {device?.["state"]?.["lastupdated"]
                ? device["state"]["lastupdated"].replace(/T|Z|\.\d+/g, " ")
                : "unknown"}
            </li>
            {sensorValues().map(([label, value]) => (
              <li key={label}>
                {label}: {value}
              </li>
            ))}
          </ul>
          </div>
        <div className="row2">
          <Battery battery={device?.["config"]?.["battery"]} />
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
