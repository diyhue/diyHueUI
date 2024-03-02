import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast';

const TheHeader = ({ HOST_IP, showSidebar, setShowSidebar, API_KEY }) => {
  const [group0State, setGroup0State] = useState(false);
  const [install, setInstall] = useState(false);
  const [check, setCheck] = useState(false);
  const [state, getState] = useState("noupdates");

  const iconVariants = {
    opened: {
      rotate: 90,
      //scale: 2
    },
    closed: {
      rotate: 0,
      //scale: 1
    },
  };

  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/swupdate2`)
      .then((result) => {
        setInstall(result.data["install"]);
        setCheck(result.data["checkforupdate"]);
        getState(result.data["state"]);
      })
      .catch((error) => {
        console.error(error);
        //toast.error(`Error occurred: ${error.message}`);
      });
    const fetchGroups = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/api/${API_KEY}/groups/0`)
          .then((fetchedData) => {
            //console.log(fetchedData.data);
            setGroup0State(fetchedData.data["state"]["any_on"]);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    fetchGroups();
    const interval = setInterval(() => {
      fetchGroups();
    }, 5000); // <<-- ⏱ 1000ms = 1s
    return () => clearInterval(interval);
  }, [HOST_IP, API_KEY]);

  const handleToggleChange = (state) => {
    const newState = { on: state };
    setGroup0State(state);
    console.log("Apply state " + JSON.stringify(newState));
    axios.put(`${HOST_IP}/api/${API_KEY}/groups/0/action`, newState);
  };

  const handleupdate = () => {
    toast.success("Check update");
  }

  return (
    <div className="topbarRight">
      <motion.div
        className="hamburger"
        initial={false}
        variants={iconVariants}
        animate={showSidebar ? "opened" : "closed"}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <FaBars />
      </motion.div>
      <div className="switchContainer">
        <form className="add-form" onSubmit={(e) => handleupdate(e)}>
          <input 
            type="submit"
            value="Update available"
            className="updatebtn"
            onChange={(e) => setCheck(e.target.checked)}
          />
        </form>
      </div>
      
      <div className="onbtn">
        <p>Turn all lights {group0State ? "off" : "on"}</p>
        <div className="switchContainer">
          <label className="switch">
            <input
              type="checkbox"
              value={group0State}
              onChange={(e) => handleToggleChange(e.target.checked)}
              checked={group0State}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TheHeader;
