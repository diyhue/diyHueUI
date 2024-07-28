import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import FlipSwitch from "../components/FlipSwitch/FlipSwitch";
import GenericButton from "../components/GenericButton/GenericButton";
import GenericText from "../components/GenericText/GenericText";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";
import CardGrid from "../components/CardGrid/CardGrid";

const Deconz = ({ HOST_IP, API_KEY }) => {
  const [enable, setEnable] = useState(false);
  const [deconzHost, setDeconzHost] = useState("127.0.0.1");
  const [deconzPort, setDeconzPort] = useState(8443);
  const [deconzUser, setDeconzUser] = useState("");

  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/deconz`)
      .then((result) => {
        setEnable(result.data["enabled"]);
        if ("deconzHost" in result.data)
          setDeconzHost(result.data["deconzHost"]);
        if ("deconzPort" in result.data)
          setDeconzPort(result.data["deconzPort"]);
        if ("deconzUser" in result.data)
          setDeconzUser(result.data["deconzUser"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error occurred, check browser console");
      });
  }, [HOST_IP, API_KEY]);

  const pairDeconz = () => {
    axios
      .post(
        `http://${deconzHost}:${deconzPort}/api`,
        { devicetype: "diyhue#bridge" },
        { timeout: 2000 }
      )
      .then((result) => {
        if ("success" in result.data[0]) {
          setDeconzUser(result.data[0]["success"]["username"]);
          axios
            .put(`${HOST_IP}/api/${API_KEY}/config`, {
              deconz: {
                enabled: enable,
                deconzHost: deconzHost,
                deconzPort: deconzPort,
                deconzUser: result.data[0]["success"]["username"],
              },
            })
            .then((fetchedData) => {
              //console.log(fetchedData.data);
              toast.success("Connected, service restart required.");
            });
        } else {
          toast.error(result.data[0]["error"]["description"]);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  const toggleEnable = (e) => {
    setEnable(e);
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, { deconz: { enabled: e } })
      .then((fetchedData) => {
        //console.log(fetchedData.data);
        toast.success(`Deconz ${e ? "enabled" : "disabled"}`);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <div className="inner">
      <CardGrid options="main">
        <GlassContainer>
          <PageContent>
            <div className="headline">Deconz Config</div>
            <form className="add-form">
              <FlipSwitch
                id="Deconz"
                value={enable}
                onChange={(e) => toggleEnable(e)}
                checked={enable}
                label="Enable"
                position="right"
              />
              <div className="form-control">
                <GenericText
                  label="Deconz host"
                  type="text"
                  placeholder="Deconz host"
                  value={deconzHost}
                  onChange={(e) => setDeconzHost(e)}
                />
              </div>
              <div className="form-control">
                <GenericText
                  label="Deconz port"
                  type="number"
                  placeholder="Deconz port"
                  value={deconzPort}
                  onChange={(e) => setDeconzPort(parseInt(e))}
                />
              </div>
              <div className="form-control">
                <GenericText
                  label="Deconz User"
                  type="text"
                  placeholder="Automatically populated"
                  readOnly={true}
                  value={deconzUser}
                />
              </div>
              <div className="form-control">
                <GenericButton
                  value={
                    typeof deconzUser === "string" && deconzUser.length > 0
                      ? "Pair again"
                      : "Pair"
                  }
                  color="blue"
                  size=""
                  type="submit"
                  onClick={() => pairDeconz()}
                />
              </div>
            </form>
          </PageContent>
        </GlassContainer>
      </CardGrid>
    </div>
  );
};

export default Deconz;
