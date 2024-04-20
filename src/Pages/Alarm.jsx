import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';

const Alarm = ({ HOST_IP, API_KEY }) => {
  const [enable, setEnable] = useState(false);
  const [email, setEmail] = useState("none");

  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/alarm`)
      .then((result) => {
        setEnable(result.data["enabled"]);
        setEmail(result.data["email"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error: ${error.message}`);
      });
  }, [HOST_IP, API_KEY]);

  const toggleEnable = (e) => {
    setEnable(e);
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, { alarm: { enabled: e } })
      .then((fetchedData) => {
        console.log(fetchedData.data);
        toast.success(`Alarm ${e ? "activated" : "deactivated"}`);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error: ${error.message}`);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        alarm: { enabled: enable, email: email },
      })
      .then((fetchedData) => {
        console.log(fetchedData.data);
        toast.success("Successfully saved");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <div className="inner">
      
      <div className="contentContainer">
      <div className="headline">Motion notifications alarm</div>
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
            <label>e-mail</label>
            <input
              type="text"
              placeholder="Notification email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

export default Alarm;
