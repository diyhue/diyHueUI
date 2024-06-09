import { FaBell } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./notificationCenter.scss";
import Wizard from "../Wizard/Wizard";
import GenericButton from "../GenericButton/GenericButton";
import { toast } from "react-hot-toast";
import { Tooltip } from "@mui/material";
import axios from "axios";


const NotificationCenter = ({HOST_IP, API_KEY, updating, notifications }) => {
  const [WizardIsOpen, setWizardIsOpen] = useState(false);
  //const [WizardName, setWizardName] = useState("");
  const [WizardContent, setWizardContent] = useState({});
  const [swstate, getState] = useState("noupdates");

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

    fetchUpdate();
    const interval = setInterval(() => {
      fetchUpdate();
    }, 5000); // <<-- ⏱ 1000ms = 1s
    return () => clearInterval(interval);
  }, [HOST_IP, API_KEY]);

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

  const openWizard = () => {
    setWizardContent(
      <>
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
      </>
    );
    setWizardIsOpen(true);
  };

  const closeWizard = () => {
    setWizardIsOpen(false);
  };

  return (
    <div className="notificationCenterContainer">
      <div className="notificationBtn" onClick={openWizard}>
        <FaBell />
        {(swstate === "anyreadytoinstall" || swstate === "allreadytoinstall") && <div className="notificationDot"></div>}
        {swstate === "installing" && <div className="updating"></div>}
      </div>
      <Wizard
        isOpen={WizardIsOpen}
        closeWizard={closeWizard}
        headline={"notificationCenter"}
        type={"notificationCenter"}
      >
        {WizardContent}
      </Wizard>
    </div>
  );
};

export default NotificationCenter;