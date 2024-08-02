import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import FlipSwitch from "../components/FlipSwitch/FlipSwitch";
import GenericButton from "../components/GenericButton/GenericButton";
import GenericText from "../components/GenericText/GenericText";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";
import CardGrid from "../components/CardGrid/CardGrid";

const Mqtt = ({ HOST_IP, API_KEY }) => {
  const [enable, setEnable] = useState(false);
  const [mqttServer, setMqttServer] = useState("mqtt");
  const [mqttPort, setMqttPort] = useState(1883);
  const [mqttUser, setMqttUser] = useState("");
  const [mqttPass, setMqttPass] = useState("");
  const [discoveryPrefix, setDiscoveryPrefix] = useState("homeassistant");

  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/mqtt`)
      .then((result) => {
        setEnable(result.data["enabled"]);
        if ("mqttServer" in result.data)
          setMqttServer(result.data["mqttServer"]);
        if ("mqttPort" in result.data) setMqttPort(result.data["mqttPort"]);
        if ("mqttUser" in result.data) setMqttUser(result.data["mqttUser"]);
        if ("mqttPassword" in result.data)
          setMqttPass(result.data["mqttPassword"]);
        if ("discoveryPrefix" in result.data)
          setDiscoveryPrefix(result.data["discoveryPrefix"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  }, [HOST_IP, API_KEY]);

  const onSubmit = () => {
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        mqtt: {
          enabled: enable,
          mqttServer: mqttServer,
          mqttPort: mqttPort,
          mqttUser: mqttUser,
          mqttPassword: mqttPass,
          discoveryPrefix: discoveryPrefix,
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
            <div className="headline">ZigBee2MQTT config</div>
            <form className="add-form">
              <FlipSwitch
                id="mqtt"
                value={enable}
                onChange={(e) => setEnable(e)}
                checked={enable}
                label="Enable"
                position="right"
              />
              <div className="form-control">
                <GenericText
                  label="MQTT server"
                  type="text"
                  placeholder="MQTT server"
                  value={mqttServer}
                  onChange={(e) => setMqttServer(e)}
                />
              </div>
              <div className="form-control">
                <GenericText
                  label="MQTT port"
                  type="number"
                  placeholder="MQTT port"
                  value={mqttPort}
                  onChange={(e) => setMqttPort(parseInt(e))}
                />
              </div>
              <div className="form-control">
                <GenericText
                  label="MQTT username"
                  type="text"
                  placeholder="MQTT username"
                  value={mqttUser}
                  onChange={(e) => setMqttUser(e)}
                />
              </div>
              <div className="form-control">
                <GenericText
                  label="MQTT password"
                  type="password"
                  placeholder="MQTT password"
                  value={mqttPass}
                  onChange={(e) => setMqttPass(e)}
                />
              </div>
              <div className="form-control">
                <GenericText
                  label="Discovery Prefix"
                  type="text"
                  placeholder="Discovery prefix"
                  value={discoveryPrefix}
                  onChange={(e) => setDiscoveryPrefix(e)}
                />
              </div>
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

export default Mqtt;
