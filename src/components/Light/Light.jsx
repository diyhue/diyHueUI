import axios from "axios";
import { toast } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "@mui/material";

import GlassContainer from "../GlassContainer/GlassContainer";
import { HueIcons } from "../../static/icons/hass-hue-icons";
import IconButton from "../IconButton/IconButton";
import LightUpdate from "../LightUpdate/LightUpdate";
import SelectMenu from "../SelectMenu/SelectMenu";
import confirmAlert from "../reactConfirmAlert/reactConfirmAlert";

const Light = ({ HOST_IP, api_key, id, light, modelIds, lightsCatalog }) => {
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
        //console.log(fetchedData.data);
        toast.success("Light successfully deleted");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error occured, check browser console");
      });
  };

  const alertLight = () => {
    axios
      .put(`${HOST_IP}/api/${api_key}/lights/${id}/state`, { alert: "select" })
      .then((fetchedData) => {
        //console.log(fetchedData.data);
        toast.success("Light alerted");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error occured, check browser console");
      });
  };

  const modelIdAlert = (modelid) => {
    if (modelid.startsWith("LCX") || modelid === "915005987201") {
      confirmAlert({
        title: modelid + " only works with native gradient sketch",
        message: `See documentation for more information: 
        https://diyhue.readthedocs.io/en/latest/lights/lightTypes.html`,
        buttons: [
          {
            label: "Confirm",
            onClick: () => setModelId(modelid),
          },
          {
            label: "Dismiss",
          },
        ],
      });
    } else {
      setModelId(modelid);
    }
  };

  const setModelId = (modelid) => {
    //console.log({ [id]: modelid });
    axios
      .post(`${HOST_IP}/light-types`, { [id]: modelid })
      .then((fetchedData) => {
        //console.log(fetchedData.data);
        toast.success("Modelid updated");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error occured, check browser console");
      });
  };

  let options = modelIds.map(function (modelid) {
    return { value: modelid, label: modelid };
  });

  return (
    <GlassContainer>
      <div className="top">
        <div className="row1">
          <Tooltip title="Alert" arrow>
            <div className="hueicon" onClick={() => alertLight()}>
              <HueIcons
                type={"light-" + light["config"]["archetype"]}
                color="#eeeeee"
              />
            </div>
          </Tooltip>

          <div className="text">{light["name"]} </div>
        </div>
        <SelectMenu
          value={{ value: light["modelid"], label: light["modelid"] }}
          label=""
          options={options}
          onChange={(e) => modelIdAlert(e.value)}
          placeholder={light["modelid"]}
        />
        <div className="row2">
          <ul>
            <li>Protocol: {light["protocol"]}</li>
            {[
              "native",
              "native_multi",
              "native_single",
              "wled",
              "esphome",
            ].includes(light["protocol"]) ? (
              <li
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open("http://" + light["protocol_cfg"]["ip"], "_blank")
                }
              >
                IP: {light["protocol_cfg"]["ip"]}
              </li>
            ) : (
              <li>IP: {light["protocol_cfg"]["ip"]}</li>
            )}
          </ul>
          <LightUpdate
            light={light}
            lightsCatalog={lightsCatalog}
          />
          <IconButton
            iconName={MdDeleteForever}
            title="Delete"
            size="small"
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
