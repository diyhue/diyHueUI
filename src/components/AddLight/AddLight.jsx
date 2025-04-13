import { useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import GenericButton from "../GenericButton/GenericButton";
import GenericText from "../GenericText/GenericText";
import SelectMenu from "../SelectMenu/SelectMenu";

const AddLight = ({ HOST_IP, API_KEY, closeWizard }) => {
  const [lightData, setLightData] = useState({
    protocol: "auto",
  });

  const handleChange = (key, value) => {
    setLightData({
      ...lightData,
      [key]: value,
    });
  };

  const handleForm = () => {
    const { protocol: lightproto, ip: lightip, ...rest } = lightData;
    const formattedData = {
      protocol: lightproto,
      ip: lightip,
      config: rest,
    };
    axios
      .post(`${HOST_IP}/api/${API_KEY}/lights`, formattedData)
      .then(() => {
        toast.success("Light added!");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
      closeWizard()
  };

  const protocols = [
    { value: "auto", label: "Autodetect" },
    { value: "domoticz", label: "Domoticz" },
    { value: "flex", label: "Flex" },
    { value: "jeedom", label: "Jeedom" },
    { value: "milight", label: "MiLight" },
    { value: "mibox", label: "Mi Box" },
    { value: "wiz", label: "Wiz" },
    { value: "dummy", label: "Dummy" },
  ];

  const milightGroups = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  const milightModes = [
    { value: "rgbw", label: "RGBW" },
    { value: "cct", label: "CCT" },
    { value: "rgb_cct", label: "RGB-CCT" },
    { value: "rgb", label: "RGB" },
  ];

  const lightModelIds = [
    { value: "LOM001", label: "On/Off Plug" },
    { value: "LWB010", label: "Dimmable Light" },
    { value: "LTW001", label: "Color temperature Light" },
    { value: "LCT015", label: "Color Light" },
    { value: "LST002", label: "Color Strip" },
  ];

  return (<>
      <SelectMenu
        label="Protocol:"
        value={protocols[0]}
        options={protocols}
        placeholder={lightData.protocol}
        onChange={(e) => handleChange("protocol", e.value)}
      />
    <div className="form-control">
      <GenericText
        label="Light IP Address"
        type="text"
        placeholder="192.168.x.x"
        value={lightData.ip}
        onChange={(e) => handleChange("ip", e)}
      />
    </div>
    {lightData.protocol !== "auto" && (
      <>
        <div className="form-control">
          <GenericText
            label="Name"
            type="text"
            placeholder="Name used on diyhue"
            value={lightData.lightName}
            onChange={(e) => handleChange("lightName", e)}
          />
        </div>
        <div className="form-control">
          <SelectMenu
            label="Emulated light type:"
            options={lightModelIds}
            placeholder={lightData.lightModelID}
            onChange={(e) => handleChange("lightModelID", e.value)}
          />
        </div>
      </>
    )}
    {(lightData.protocol === "milight" || lightData.protocol === "mibox") && (
      <>
        <div className="form-control">
          <GenericText
            label="Device ID"
            type="text"
            placeholder="0x1234"
            value={lightData.miID}
            onChange={(e) => handleChange("miID", e)}
          />
        </div>
        <div className="form-control">
          <SelectMenu
            label="Choose light mode:"
            options={milightModes}
            placeholder={lightData.miModes}
            onChange={(e) => handleChange("miModes", e.value)}
          />
        </div>
        <div className="form-control">
          <SelectMenu
            label="Choose light group:"
            options={milightGroups}
            placeholder={lightData.miGroups}
            onChange={(e) => handleChange("miGroups", e.value)}
          />
        </div>
      </>
    )}
    {lightData.protocol === "mibox" && (
      <div className="form-control">
        <GenericText
          label="Port"
          type="number"
          placeholder="Mi Box port"
          value={lightData.miBoxPort}
          onChange={(e) => handleChange("miboxPort", e)}
        />
      </div>
    )}
    {lightData.protocol === "domoticz" && (
      <div className="form-control">
        <GenericText
          label="Device ID"
          type="text"
          placeholder="Device ID"
          value={lightData.domoticzID}
          onChange={(e) => handleChange("domoticzID", e)}
        />
      </div>
    )}
    {lightData.protocol === "jeedom" && (
      <>
        <div className="form-control">
          <GenericText
            label="Light Api"
            type="text"
            placeholder="Light Api"
            value={lightData.jeedomlightAPI}
            onChange={(e) => handleChange("jeedomlightAPI", e)}
          />
        </div>
        <div className="form-control">
          <GenericText
            label="Light ID"
            type="text"
            placeholder="Light ID"
            value={lightData.jeedomlightID}
            onChange={(e) => handleChange("jeedomlightID", e)}
          />
        </div>
      </>
    )}
    <div className="form-control">
      <GenericButton
        value="Add Light"
        color="blue"
        size=""
        type="submit"
        onClick={() => handleForm()}
      />
    </div>
  </>);
};

export default AddLight;
