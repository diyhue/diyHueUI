import { MdDeleteForever } from "react-icons/md";
import LightUpdate from "../LightUpdate/LightUpdate";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { HueIcons } from "../../static/icons/hass-hue-icons"
import Select from "react-select"

import "./light.scss";
import IconButton from "../IconButton/IconButton";
import GlassContainer from "../GlassContainer/GlassContainer";

const Light = ({
  HOST_IP,
  api_key,
  id,
  light,
  modelIds,
  setType,
  setMessage,
  lightsCatalog,
}) => {
  const deleteAlert = () => {
    confirmAlert({
      title: "Delete light " + light["name"],
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteLight(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteLight = () => {
    axios
      .delete(`${HOST_IP}/api/${api_key}/lights/${id}`)
      .then((fetchedData) => {
        console.log(fetchedData.data);
        setMessage("Light successfully deleted");
        setType("none");
        setType("success");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Error occured, check browser console");
        setType("none");
        setType("error");
      });
  };

  const alertLight = () => {
    axios
      .put(`${HOST_IP}/api/${api_key}/lights/${id}/state`, { alert: "select" })
      .then((fetchedData) => {
        console.log(fetchedData.data);
        setMessage("Light alerted");
        setType("none");
        setType("success");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Error occured, check browser console");
        setType("none");
        setType("error");
      });
  };

  const setModelId = (modelid) => {
    console.log({ [id]: modelid });
    axios
      .post(`${HOST_IP}/light-types`, { [id]: modelid })
      .then((fetchedData) => {
        console.log(fetchedData.data);
        setMessage("Modelid updated");
        setType("none");
        setType("success");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Error occured, check browser console");
        setType("none");
        setType("error");
      });
  };

  let options = modelIds.map(function (modelid) {
    return { value: modelid, label: modelid };
  })

 

  return (
    <GlassContainer>
      <div className="light">
        <div className="row1">
          <div className="icon">
            <HueIcons
            type = {"light-" + light["config"]["archetype"]}
            color= "#eeeeee"
            onClick={() => alertLight()} />
          </div>

          <div className="text">{light["name"]} </div>
        </div>
        <div className="row2">
          <div className="form-control">
            <Select 
              options={options}
              placeholder={light["modelid"]}
              onChange={(e) => setModelId(e.value)}
              menuPortalTarget={document.body}
              menuPosition={'fixed'} 
            />
          </div>
          <LightUpdate
            light={light}
            lightsCatalog={lightsCatalog}
            setMessage={setMessage}
            setType={setType}
          />
          
        </div>
        <div className="row3">
          <ul>
            <li>Protocol: {light["protocol"]}</li>
            {["native", "native_multi", "native_single", "wled", "esphome"].includes(light["protocol"]) ? (
              <li style={{cursor:'pointer'}} onClick={()=> window.open("http://" + light["protocol_cfg"]["ip"], "_blank")}>IP: {light["protocol_cfg"]["ip"]}</li>
            ): (
              <li>IP: {light["protocol_cfg"]["ip"]}</li>
              )}
            
          </ul>
          <IconButton 
            iconName="MdDeleteForever" 
            title="Delete" 
            color="red" 
            onClick={() => deleteAlert()} 
          />
        </div>

        {light["state"]["reachable"] || <div className="label">Offline</div>}
      </div>
    </GlassContainer>
  );
};

export default Light;
