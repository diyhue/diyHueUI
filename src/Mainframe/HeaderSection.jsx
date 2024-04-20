import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast';
import { Tooltip } from '@mui/material';

const HeaderSection = ({ HOST_IP, showSidebar, setShowSidebar, API_KEY }) => {
  const [group0State, setGroup0State] = useState(false);
  const [swstate, getState] = useState("noupdates");

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
    const fetchUpdate = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/api/${API_KEY}/config/swupdate2`)
          .then((result) => {
            getState(result.data["state"]);
          })
          .catch((error) => {
            console.error(error);
            toast.error(`Error occurred: ${error.message}`);
          });
      }
    };
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
            toast.error(`Error occurred: ${error.message}`);
          });
      }
    };

    fetchUpdate();
    fetchGroups();
    const interval = setInterval(() => {
      fetchGroups();
      fetchUpdate();
    }, 5000); // <<-- ⏱ 1000ms = 1s
    return () => clearInterval(interval);
  }, [HOST_IP, API_KEY]);

  const handleToggleChange = (state) => {
    const newState = { on: state };
    setGroup0State(state);
    console.log("Apply state " + JSON.stringify(newState));
    axios.put(`${HOST_IP}/api/${API_KEY}/groups/0/action`, newState);
  };

  const handleupdate = (state) => {
    if (state === "anyreadytoinstall" || state === "allreadytoinstall") {
      axios
        .put(`${HOST_IP}/api/${API_KEY}/config`, {
          swupdate2: { install: true },
        })
        .then((fetchedData) => {
          console.log(fetchedData.data);
          toast.success("Install update");
        })
        .catch((error) => {
          console.error(error);
          toast.error(`Error occurred: ${error.message}`);
        });
    }
    if (state === "noupdates" || state === "unknown") {
      axios
        .put(`${HOST_IP}/api/${API_KEY}/config`, {
          swupdate2: { checkforupdate: true, install: false },
        })
        .then((fetchedData) => {
          console.log(fetchedData.data);
          toast.success("Check update");
        })
        .catch((error) => {
          console.error(error);
          toast.error(`Error occurred: ${error.message}`);
        });
    }
  }

  const getValueState = (state) => {
    if (state === "anyreadytoinstall" || state === "allreadytoinstall") {
      return "Update available";
    }
    else if (state === "noupdates" || state === "unknown") {
      return "No Update";
    }
    else if (state === "installing") {
      return "installing..."
    }
  }

  const getClassState = (state) => {
    if (state === "anyreadytoinstall" || state === "allreadytoinstall") {
      return "updatebtn update";
    }
    else if (state === "noupdates" || state === "unknown") {
      return "updatebtn check";
    }
    else if (state === "installing") {
      return "updatebtn install"
    }
  }

  const getTitleState = (state) => {
    if (state === "anyreadytoinstall" || state === "allreadytoinstall") {
      return "Install update";
    }
    else if (state === "noupdates" || state === "unknown") {
      return "Check for update";
    }
    else if (state === "installing") {
      return "Update is installing"
    }
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
        <form className="add-form" onSubmit={(e) => handleupdate(swstate, e)}>
          <Tooltip title={<p style={{ fontSize: "18px" }}>{getTitleState(swstate)}</p>} arrow>
            <input
              type="submit"
              value={getValueState(swstate)}
              className={getClassState(swstate)}
            />
          </Tooltip>
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

export default HeaderSection;
