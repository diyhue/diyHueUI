import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import FlipSwitch from "../components/FlipSwitch/FlipSwitch";
import GenericButton from "../components/GenericButton/GenericButton";
import GenericText from "../components/GenericText/GenericText";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";
import CardGrid from "../components/CardGrid/CardGrid";

const HA = ({ HOST_IP, API_KEY }) => {
  const [enable, setEnable] = useState(false);
  const [homeAssistantIp, setHomeAssistantIp] = useState("127.0.0.1");
  const [homeAssistantPort, setHomeAssistantPort] = useState(8123);
  const [homeAssistantToken, setHomeAssistantToken] = useState("");
  const [homeAssistantIncludeByDefault, setHomeAssistantIncludeByDefault] =
    useState(true);
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
          setHomeAssistantIncludeByDefault(
            result.data["homeAssistantIncludeByDefault"]
          );
        if ("homeAssistantUseHttps" in result.data)
          setHomeAssistantUseHttps(result.data["homeAssistantUseHttps"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [HOST_IP, API_KEY]);

  const onSubmit = () => {
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        homeassistant: {
          enabled: enable,
          homeAssistantIp: homeAssistantIp,
          homeAssistantPort: homeAssistantPort,
          homeAssistantToken: homeAssistantToken,
          homeAssistantIncludeByDefault: homeAssistantIncludeByDefault,
          homeAssistantUseHttps: homeAssistantUseHttps,
        },
      })
      .then((fetchedData) => {
        //console.log(fetchedData.data);
        toast.success("Successfully saved, please restart the service");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  return (
    <div className="inner">
      <CardGrid options="main">
        <GlassContainer>
          <PageContent>
            <div className="headline">Home Assistant config</div>
            <form className="add-form">
              <FlipSwitch
                id="ha"
                value={enable}
                onChange={(e) => setEnable(e)}
                checked={enable}
                label="Enable"
                position="right"
              />
              <div className="form-control">
                <GenericText
                  label="Home Assistant IP"
                  type="text"
                  placeholder="IP or hostname"
                  value={homeAssistantIp}
                  onChange={(e) => setHomeAssistantIp(e)}
                />
              </div>
              <div className="form-control">
                <GenericText
                  label="Home Assistant port"
                  type="number"
                  placeholder="8123"
                  value={homeAssistantPort}
                  onChange={(e) => setHomeAssistantPort(e)}
                />
              </div>
              <div className="form-control">
                <GenericText
                  label="Home Assistant token"
                  type="password"
                  placeholder="Token"
                  value={homeAssistantToken}
                  onChange={(e) => setHomeAssistantToken(e)}
                />
              </div>
              <FlipSwitch
                value={homeAssistantIncludeByDefault}
                onChange={(e) => setHomeAssistantIncludeByDefault(e)}
                checked={homeAssistantIncludeByDefault}
                label="Included by default"
                position="right"
              />

              <FlipSwitch
                value={homeAssistantUseHttps}
                onChange={(e) => setHomeAssistantUseHttps(e)}
                checked={homeAssistantUseHttps}
                label="Enable HTTPS"
                position="right"
              />
              <div className="form-control">
                <GenericButton
                  value="Save"
                  color="blue"
                  size=""
                  type="submit"
                  onClick={() => onSubmit()}
                />
              </div>
            </form>
          </PageContent>
        </GlassContainer>
      </CardGrid>
    </div>
  );
};

export default HA;
