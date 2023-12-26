import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

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

  const pairTradfri = (e) => {
    e.preventDefault();
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
        console.log(result.data);
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
      <div className="contentContainer">
      <div className="headline">IKEA Tradfri Gateway</div>
        <form className="add-form" onSubmit={(e) => pairTradfri(e)}>
          <div className="form-control">
            <label>Tradfri Gateway IP</label>
            <input
              type="text"
              placeholder="192.168.x.x"
              value={tradfriGwIp}
              onChange={(e) => setTradfriGwIp(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Identity</label>
            <input
              type="text"
              placeholder="Identity used for pairing"
              value={tradfriIdentity}
              onChange={(e) => setTradfriIdentity(e.target.value)}
            />
          </div>
          {tradfriPsk === "" && (
            <div className="form-control">
              <label>Security Code</label>
              <input
                type="text"
                placeholder="Located on gateway label"
                value={tradfriCode}
                onChange={(e) => setTradfriCode(e.target.value)}
              />
            </div>
          )}
          {tradfriPsk !== "" && (
            <div className="form-control">
              <label>Paired Key</label>
              <input
                type="text"
                readOnly
                placeholder="Located on gateway label"
                value={tradfriPsk}
              />
            </div>
          )}
          <div className="form-control">
            <input
              type="submit"
              value={
                typeof tradfriPsk === "string" && tradfriPsk.length > 0
                  ? "Change Ip"
                  : "Pair"
              }
              className="btn btn-block"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tradfri;