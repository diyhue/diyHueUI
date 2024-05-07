import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import GenericButton from "../components/GenericButton/GenericButton";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";

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

  const pairBridge = (e) => {
    e.preventDefault();
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
              console.log(fetchedData.data);
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
      <GlassContainer>
        <PageContent>
          <div className="headline">Pair original Hue Bridge</div>
          <form className="add-form" onSubmit={(e) => pairBridge(e)}>
            <div className="form-control">
              <label>Bridge Ip</label>
              <input
                type="text"
                placeholder="192.168.x.x"
                value={bridgeIp}
                onChange={(e) => setBridgeIp(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Hue User</label>
              <input
                type="text"
                placeholder="Automatically populated"
                readOnly
                value={hueUser}
              />
            </div>
            <div className="form-control">
              <label>Hue Key</label>
              <input
                type="text"
                placeholder="Automatically populated"
                readOnly
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
              />
            </div>
          </form>
        </PageContent>
      </GlassContainer>
    </div>
  );
};

export default Phillips;
