import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import GenericButton from "../components/GenericButton/GenericButton";
import GenericText from "../components/GenericText/GenericText";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";
import CardGrid from "../components/CardGrid/CardGrid";

const Phillips = ({ HOST_IP, API_KEY }) => {
  const [bridgeIp, setBridgeIp] = useState("192.168.x.x");
  const [hueUser, setHueUser] = useState("");
  const [hueKey, setHueKey] = useState("");

  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/hue`)
      .then((result) => {
        setBridgeIp(result.data["ip"]);
        setHueUser(result.data["hueUser"]);
        setHueKey(result.data["hueKey"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  }, [HOST_IP, API_KEY]);

  const pairBridge = () => {
    axios
      .post(`http://${bridgeIp}/api`, {
        devicetype: "diyhue#bridge",
        generateclientkey: true,
      })
      .then((result) => {
        if ("success" in result.data[0]) {
          setHueUser(result.data[0]["success"]["username"]);
          setHueKey(result.data[0]["success"]["clientkey"]);
          axios
            .put(`${HOST_IP}/api/${API_KEY}/config`, {
              hue: {
                ip: bridgeIp,
                hueUser: result.data[0]["success"]["username"],
                hueKey: result.data[0]["success"]["clientkey"],
              },
            })
            .then((fetchedData) => {
              //console.log(fetchedData.data);
              toast.success("Connected, now scan for lights");
            })
            .catch((error) => {
              console.error(error);
              toast.error(`Error occurred: ${error.message}`);
            });
        } else {
          toast.error(result.data[0]["error"]["description"]);
        }
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
            <div className="headline">Pair original Hue Bridge</div>
            <form className="add-form">
              <div className="form-control">
                <GenericText
                  label="Bridge Ip"
                  type="text"
                  placeholder="192.168.x.x"
                  value={bridgeIp}
                  onChange={(e) => setBridgeIp(e)}
                />
              </div>
              <div className="form-control">
                <GenericText
                  label="Hue User"
                  type="text"
                  placeholder="Automatically populated"
                  readOnly={true}
                  value={hueUser}
                />
              </div>
              <div className="form-control">
                <GenericText
                  label="Hue Key"
                  type="text"
                  placeholder="Automatically populated"
                  readOnly={true}
                  value={hueKey}
                />
              </div>
              <div className="form-control">
                <GenericButton
                  value={
                    typeof hueUser === "string" && hueUser.length > 0
                      ? "Pair again"
                      : "Pair"
                  }
                  color="blue"
                  size=""
                  type="submit"
                  onClick={() => pairBridge()}
                />
              </div>
            </form>
          </PageContent>
        </GlassContainer>
      </CardGrid>
    </div>
  );
};

export default Phillips;
