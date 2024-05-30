import { useState, useEffect } from "react";

import axios from "axios";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Tooltip } from "@mui/material";

import GenericButton from "../components/GenericButton/GenericButton";
import FlipSwitch from "../components/FlipSwitch/FlipSwitch";


import "./headerSection.scss";
import NotificationCenter from "../components/NotificationCenter/NotificationCenter";

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
    //console.log("Apply state " + JSON.stringify(newState));
    axios
      .put(`${HOST_IP}/api/${API_KEY}/groups/0/action`, newState)
      .then((response) => {
        // Only update the state if the request was successful
        setGroup0State(state);
      })
      .catch((error) => {
        console.error("Error updating state: ", error);
      });
  };

  const handleupdate = (state) => {
    if (state === "anyreadytoinstall" || state === "allreadytoinstall") {
      axios
        .put(`${HOST_IP}/api/${API_KEY}/config`, {
          swupdate2: { install: true },
        })
        .then((fetchedData) => {
          //console.log(fetchedData.data);
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
          //console.log(fetchedData.data);
          toast.success("Check update");
        })
        .catch((error) => {
          console.error(error);
          toast.error(`Error occurred: ${error.message}`);
        });
    }
  };

  const getValueState = (state) => {
    if (state === "anyreadytoinstall" || state === "allreadytoinstall") {
      return "Update available";
    } else if (state === "noupdates" || state === "unknown") {
      return "No Update";
    } else if (state === "installing") {
      return "installing...";
    }
  };

  const getClassState = (state) => {
    if (state === "anyreadytoinstall" || state === "allreadytoinstall") {
      return "updatebtn update";
    } else if (state === "noupdates" || state === "unknown") {
      return "updatebtn check";
    } else if (state === "installing") {
      return "updatebtn install";
    }
  };

  const getTitleState = (state) => {
    if (state === "anyreadytoinstall" || state === "allreadytoinstall") {
      return "Install update";
    } else if (state === "noupdates" || state === "unknown") {
      return "Check for update";
    } else if (state === "installing") {
      return "Update is installing";
    }
  };

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

      <NotificationCenter
        notifications={true}
        updating={true}
      >

      </NotificationCenter>

      <div className="switchContainer">
        <Tooltip
          title={<p style={{ fontSize: "18px" }}>{getTitleState(swstate)}</p>}
          arrow
        >
          <div>
            <GenericButton
              value={getValueState(swstate)}
              color={getClassState(swstate)}
              size=""
              type="submit"
              onClick={() => handleupdate(swstate)}
            />
          </div>
        </Tooltip>
      </div>

      <div className="onbtn">
        <FlipSwitch
          value={group0State}
          onChange={(e) => handleToggleChange(e)}
          checked={group0State}
          label={`Turn all lights ${group0State ? "off" : "on"}`}
        />
      </div>
    </div>
  );
};

export default HeaderSection;
