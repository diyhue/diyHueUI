import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

const Settings = ({ HOST_IP, API_KEY }) => {
  const [enable, setEnable] = useState(false);
  const [port, setPort] = useState("80");

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
  }, [HOST_IP, API_KEY]);

  const toggleEnable = (e) => {
    setEnable(e);
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, { port: { enabled: e } })
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

  return (
    <div className="inner">
      <div className="contentContainer">
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
    </div>
  );
};

export default Settings;