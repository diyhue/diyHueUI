import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import FlipSwitch from "../components/FlipSwitch/FlipSwitch";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";

const HA = ({ HOST_IP, API_KEY }) => {
  const [enable, setEnable] = useState(false);
  const [homeAssistantIp, setHomeAssistantIp] = useState("127.0.0.1");
  const [homeAssistantPort, setHomeAssistantPort] = useState(8123);
  const [homeAssistantToken, setHomeAssistantToken] = useState("");
  const [homeAssistantIncludeByDefault, setHomeAssistantIncludeByDefault] = useState(true);
  const [homeAssistantUseHttps, setHomeAssistantUseHttps] = useState(false);

  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/homeassistant`)
      .then((result) => {
        setEnable(result.data["enabled"]);
        if ("homeAssistantIp" in result.data)
          setHomeAssistantIp(result.data["homeAssistantIp"]);
        if ("homeAssistantPort" in result.data)
          setHomeAssistantPort(result.data["homeAssistantPort"]);
        if ("homeAssistantToken" in result.data)
          setHomeAssistantToken(result.data["homeAssistantToken"]);
        if ("homeAssistantIncludeByDefault" in result.data)
          setHomeAssistantIncludeByDefault(result.data["homeAssistantIncludeByDefault"]);
        if ("homeAssistantUseHttps" in result.data)
          setHomeAssistantUseHttps(result.data["homeAssistantUseHttps"]);

      })
      .catch((error) => {
        console.error(error);
      });
  }, [HOST_IP, API_KEY]);

  const onSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        homeassistant: {
          enabled: enable,
          homeAssistantIp: homeAssistantIp,
          homeAssistantPort: homeAssistantPort,
          homeAssistantToken: homeAssistantToken,
          homeAssistantIncludeByDefault: homeAssistantIncludeByDefault,
          homeAssistantUseHttps: homeAssistantUseHttps
        },
      })
      .then((fetchedData) => {
        console.log(fetchedData.data);
        toast.success("Successfully saved, please restart the service");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  return (
    <div className="inner">
      <GlassContainer>
        <PageContent>
          <div className="headline">Home Assistant config</div>
          <form className="add-form" onSubmit={(e) => onSubmit(e)}>
            <FlipSwitch 
              value={enable} 
              onChange={(e) => setEnable(e)} 
              checked={enable} 
            />
            <div className="form-control">
              <label>Home Assistant IP</label>
              <input
                type="text"
                placeholder="IP or hostname"
                value={homeAssistantIp}
                onChange={(e) => setHomeAssistantIp(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Home Assistant port</label>
              <input
                type="number"
                placeholder="8123"
                value={homeAssistantPort}
                onChange={(e) => setHomeAssistantPort(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Home Assistant token</label>
              <input
                type="text"
                placeholder="Token"
                value={homeAssistantToken}
                onChange={(e) => setHomeAssistantToken(e.target.value)}
              />
            </div>
            <FlipSwitch 
              value={homeAssistantIncludeByDefault} 
              onChange={(e) => setHomeAssistantIncludeByDefault(e)} 
              checked={homeAssistantIncludeByDefault} 
              label="Included by default"
            />

            <FlipSwitch 
              value={homeAssistantUseHttps} 
              onChange={(e) => setHomeAssistantUseHttps(e)} 
              checked={homeAssistantUseHttps} 
              label="Enable HTTPS"
            />
            <div className="form-control">
              <input type="submit" value="Save" className="btn btn-block" />
            </div>
          </form>
        </PageContent>
      </GlassContainer>
    </div>
  );
};

export default HA;
