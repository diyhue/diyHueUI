/*const Settings = () => {
    return (
        <div className="inner">
            <div className="contentContainer">
                <div className="headline">Settings</div>
                <p>Work in progress. </p>
            </div>
        </div>
      
  );
};

export default Settings;*/



import { useState, useEffect } from "react";
import axios from "axios";
import Flash from "../containers/Flash";

const Settings = ({ HOST_IP, API_KEY }) => {
  const [type, setType] = useState("none");
  const [message, setMessage] = useState("no message");
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
      });
  }, [HOST_IP, API_KEY]);

  const toggleEnable = (e) => {
    setEnable(e);
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, { port: { enabled: e } })
      .then((fetchedData) => {
        console.log(fetchedData.data);
        setMessage(`Port ${e ? "activated" : "deactivated"}`);
        setType("none");
        setType("success");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Error occured, check browser console");
        setType("none");
        setType("error");
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
        setMessage("Successfully saved");
        setType("none");
        setType("success");
      })
      .catch((error) => {
        console.error(error);
        setMessage("Error occured, check browser console");
        setType("none");
        setType("error");
      });
  };

  return (
    <div className="inner">
      {type !== "none" && (
        <Flash
          type={type}
          message={message}
          duration="5000"
          setType={setType}
        />
      )}
      <div className="contentContainer">
      <div className="headline">Add extra port for searching</div>
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
