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

import "../components/reactConfirmAlert/reactConfirmAlert.scss";

const Behaviors = ({ HOST_IP, API_KEY }) => {
  const [WizardIsOpen, setWizardIsOpen] = useState(false);
  const [Behaviors, setBehaviors] = useState([]);
  const [rooms, setRooms] = useState([]); // Add this state

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
          title: "Unsaved changes",
          message: "You have unsaved changes. Are you sure you want to leave without saving?",
          buttons: [
            {
              label: "Leave without saving",
              onClick: () => setWizardIsOpen(false),
            },
            {
              label: "Cancel",
              onClick: () => {},
            },
          ],
        });
      }
    };

  useEffect(() => {
    const fetchBehaviors = () => {
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
      else {
        console.error("API_KEY is undefined");
      }
    };

    const fetchRooms = () => {
      axios
        .get(`${HOST_IP}/clip/v2/resource/room`, 
          {
            headers: {
              "hue-application-key": API_KEY,
            },
          }
        )
        .then((response) => {
          const roomOptions = response.data.data.map(room => ({
            value: room.id,
            label: room.metadata.name,
          }));
          setRooms(roomOptions);
          //console.log("Rooms fetched:", roomOptions);
        })
        .catch((error) => {
          console.error("Error fetching rooms:", error);
        });
    }

    fetchBehaviors();
    fetchRooms();
    const interval = setInterval(() => {
      fetchBehaviors();
      fetchRooms();
    }, 10000); // <<-- ⏱ 1000ms = 1s
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
              API_KEY={API_KEY}
              id={id}
              Behavior={Behavior}
              rooms={rooms}
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
