import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import GenericButton from "../components/GenericButton/GenericButton";
import GenericText from "../components/GenericText/GenericText";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";
import CardGrid from "../components/CardGrid/CardGrid";

const Tradfri = ({ HOST_IP, API_KEY }) => {
  const [tradfriGwIp, setTradfriGwIp] = useState("192.168.x.x");
  const [tradfriCode, setTradfriCode] = useState("");
  const [tradfriIdentity, setTradfriIdentity] = useState("");
  const [tradfriPsk, setTradfriPsk] = useState("");

  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/tradfri`)
      .then((result) => {
        if (result.data["psk"] !== undefined) {
          setTradfriGwIp(result.data["tradfriGwIp"]);
          setTradfriIdentity(result.data["identity"]);
          setTradfriPsk(result.data["psk"]);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  }, [HOST_IP, API_KEY]);

  const pairTradfri = () => {
    axios
      .post(
        `${HOST_IP}/tradfri`,
        {
          identity: tradfriIdentity,
          tradfriGwIp: tradfriGwIp,
          tradfriCode: tradfriCode,
        },
        { timeout: 2000 }
      )
      .then((result) => {
        //console.log(result.data);
        if (result.data["result"] === "success") {
          setTradfriPsk(result.data["psk"]["success"]);
          toast.success("Connected, now search for lights");
        } else {
          toast.error("Error:" + result.data["result"]);
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
            <div className="headline">IKEA Tradfri Gateway</div>
            <form className="add-form">
              <div className="form-control">
                <GenericText
                  label="Tradfri Gateway IP"
                  type="text"
                  placeholder="192.168.x.x"
                  value={tradfriGwIp}
                  onChange={(e) => setTradfriGwIp(e)}
                />
              </div>
              <div className="form-control">
                <GenericText
                  label="Identity"
                  type="text"
                  placeholder="Identity used for pairing"
                  value={tradfriIdentity}
                  onChange={(e) => setTradfriIdentity(e)}
                />
              </div>
              {tradfriPsk === "" && (
                <div className="form-control">
                  <GenericText
                    label="Security Code"
                    type="password"
                    placeholder="Located on gateway label"
                    value={tradfriCode}
                    onChange={(e) => setTradfriCode(e)}
                  />
                </div>
              )}
              {tradfriPsk !== "" && (
                <div className="form-control">
                  <GenericText
                    label="Paired Key"
                    type="text"
                    readOnly={true}
                    placeholder="Located on gateway label"
                    value={tradfriPsk}
                  />
                </div>
              )}
              <div className="form-control">
                <GenericButton
                  value={
                    typeof tradfriPsk === "string" && tradfriPsk.length > 0
                      ? "Change Ip"
                      : "Pair"
                  }
                  color="blue"
                  size=""
                  type="submit"
                  onClick={() => pairTradfri()}
                />
              </div>
            </form>
          </PageContent>
        </GlassContainer>
      </CardGrid>
    </div>
  );
};

export default Tradfri;
