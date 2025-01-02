import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BsPlusCircle } from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";

import IconButton from "../components/IconButton/IconButton";
import Wizard from "../components/Wizard/Wizard";
import CardGrid from "../components/CardGrid/CardGrid";
import Map_Behavior from "../components/Behaviors/Map_behavior";
import Make_Behaviors from "../components/Behaviors/Make_behavior";

const Behaviors = ({ HOST_IP, API_KEY }) => {
  const [WizardIsOpen, setWizardIsOpen] = useState(false);
  const [Behaviors, setBehaviors] = useState([]);

  const openWizard = () => {
    setWizardIsOpen(true);
  };

  const closeWizard = (save = false) => {
      if (save) {
        console.log("Close wizard and save");
        setWizardIsOpen(false);
      } else {
        console.log("Close wizard without saving");
        confirmAlert({
          title: "Confirm to close",
          message: "You have unsaved changes. Are you sure you want to close?",
          buttons: [
            {
              label: "Yes",
              onClick: () => setWizardIsOpen(false),
            },
            {
              label: "No",
              onClick: () => {},
            },
          ],
        });
      }
    };

  useEffect(() => {
    const fetchLights = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/clip/v2/resource/behavior_instance`,
            {
              headers: {
                "hue-application-key": API_KEY,
              },
            }
          )
          .then((fetchedData) => {
            const behavior_data = fetchedData.data["data"];
            setBehaviors((prevConfig) => {
                if (
                  JSON.stringify(prevConfig) !== JSON.stringify(behavior_data)
                ) {
                  return behavior_data;
                }
                return prevConfig;
              });
            })
          .catch((error) => {
            console.error(error);
            toast.error(`Error occurred: ${error.message}`);
          });
      }
    };

    fetchLights();
    const interval = setInterval(() => {
      fetchLights();
    }, 2000); // <<-- ⏱ 1000ms = 1s
    return () => clearInterval(interval);
  }, [HOST_IP, API_KEY]);

  return (
    <div className="content">
      <div className="inner">
      <CardGrid>
          <IconButton
            iconName={BsPlusCircle}
            title="Add Automation"
            size="big"
            color="btn"
            label="Add Automation"
            onClick={() => openWizard()}
          />
        </CardGrid>

        <CardGrid>
          {Behaviors.length > 0 && Object.entries(Behaviors).map(([id, Behavior]) => (
            <Map_Behavior
              key={id}
              HOST_IP={HOST_IP}
              api_key={API_KEY}
              id={id}
              Behavior={Behavior}
            />
          ))}
        </CardGrid>
      </div>

      <Wizard
        isOpen={WizardIsOpen}
        closeWizard={() => closeWizard(false)}
        headline="Add Behaviors"
      >
        <Make_Behaviors HOST_IP={HOST_IP} API_KEY={API_KEY} closeWizard={closeWizard}></Make_Behaviors>
      </Wizard>
    </div>
  );
};

export default Behaviors;