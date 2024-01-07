import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

const Settings = ({ HOST_IP, API_KEY }) => {
  const [enable, setEnable] = useState(false);
  const [port, setPort] = useState("80");
  const [yeelight, setYeelight] = useState(true);
  const [native_multi, setNative_multi] = useState(true);
  const [tasmota, setTasmota] = useState(true);
  const [wled, setWled] = useState(true);
  const [shelly, setShelly] = useState(true);
  const [esphome, setEsphome] = useState(true);
  const [hyperion, setHyperion] = useState(true);
  const [tpkasa, setTpkasa] = useState(true);
  const [elgato, setElgato] = useState(true);

  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/port`)
      .then((result) => {
        setEnable(result.data["enabled"]);
        setPort(result.data["ports"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/yeelight`)
      .then((result) => {
        setYeelight(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/native_multi`)
      .then((result) => {
        setNative_multi(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/tasmota`)
      .then((result) => {
        setTasmota(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/wled`)
      .then((result) => {
        setWled(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/shelly`)
      .then((result) => {
        setShelly(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/esphome`)
      .then((result) => {
        setEsphome(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/hyperion`)
      .then((result) => {
        setHyperion(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/tpkasa`)
      .then((result) => {
        setTpkasa(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/elgato`)
      .then((result) => {
        setElgato(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  }, [HOST_IP, API_KEY]);

  const toggleEnable = (e) => {
    setEnable(e);
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        port: { enabled: e }
      })
      .then((fetchedData) => {
        console.log(fetchedData.data);
        toast.success(`Port ${e ? "activated" : "deactivated"}`);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        port: { enabled: enable, ports: port.match(/\d+/g).map(Number) },
      })
      .then((fetchedData) => {
        console.log(fetchedData.data);
        console.log([port]);
        toast.success("Successfully saved");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  const onSubmit_protocol = (e) => {
    e.preventDefault();
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        yeelight: { enabled: yeelight },
        native_multi: { enabled: native_multi },
        tasmota: { enabled: tasmota },
        wled: { enabled: wled },
        shelly: { enabled: shelly },
        esphome: { enabled: esphome },
        hyperion: { enabled: hyperion },
        tpkasa: { enabled: tpkasa },
        elgato: { enabled: elgato },
      })
      .then((fetchedData) => {
        console.log(fetchedData.data);
        toast.success("Successfully saved");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  return (
    <div className="inner">
      <div className="contentContainer spacer">
        <div className="headline">Add extra port for searching</div>
        <p>This wil make the bridge search on other ports.</p>
        <p>If disabled the bridge wil only search on port 80.</p>
        <p>The standard port is 80, always include port 80.</p>
        <p>To add ports separate the ports with "," ex: 80,81,82</p>
        <form className="add-form" onSubmit={(e) => onSubmit(e)}>
          <div className="switchContainer">
            <label className="switch">
              <input
                type="checkbox"
                value={enable}
                checked={enable}
                onChange={(e) => toggleEnable(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="form-control">
            <label>Port</label>
            <input
              type="text"
              placeholder="Aditional ports"
              value={port}
              onChange={(e) => setPort(e.target.value)}
            />
          </div>
          <div className="form-control">
            <input type="submit" value="Save" className="btn btn-block" />
          </div>
        </form>
      </div>

      <div className="contentContainer">
        <div className="headline">Search Config</div>
        <p>Set which protocol to find.</p>
        <form className="add-form" onSubmit={(e) => onSubmit_protocol(e)}>
          <div className="switchContainer">
            <p>Yeelight</p>
            <label className="switch">
              <input
                type="checkbox"
                value={yeelight}
                checked={yeelight}
                onChange={(e) => setYeelight(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="switchContainer">
            <p>Native_multi</p>
            <label className="switch">
              <input
                type="checkbox"
                value={native_multi}
                checked={native_multi}
                onChange={(e) => setNative_multi(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="switchContainer">
            <p>Tasmota</p>
            <label className="switch">
              <input
                type="checkbox"
                value={tasmota}
                checked={tasmota}
                onChange={(e) => setTasmota(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="switchContainer">
            <p>Wled</p>
            <label className="switch">
              <input
                type="checkbox"
                value={wled}
                checked={wled}
                onChange={(e) => setWled(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="switchContainer">
            <p>Shelly</p>
            <label className="switch">
              <input
                type="checkbox"
                value={shelly}
                checked={shelly}
                onChange={(e) => setShelly(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="switchContainer">
            <p>Esphome</p>
            <label className="switch">
              <input
                type="checkbox"
                value={esphome}
                checked={esphome}
                onChange={(e) => setEsphome(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="switchContainer">
            <p>Hyperion</p>
            <label className="switch">
              <input
                type="checkbox"
                value={hyperion}
                checked={hyperion}
                onChange={(e) => setHyperion(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="switchContainer">
            <p>Tpkasa</p>
            <label className="switch">
              <input
                type="checkbox"
                value={tpkasa}
                checked={tpkasa}
                onChange={(e) => setTpkasa(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="switchContainer">
            <p>Elgato</p>
            <label className="switch">
              <input
                type="checkbox"
                value={elgato}
                checked={elgato}
                onChange={(e) => setElgato(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="form-control">
            <input type="submit" value="Save" className="btn btn-block" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;