import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { BsPlusCircle } from "react-icons/bs";

import AddLight from "../components/AddLight/AddLight";
import CardGrid from "../components/CardGrid/CardGrid";
import { ScanIcon } from "../static/icons/scan";
import Light from "../components/Light/Light";
import Wizard from "../components/Wizard/Wizard";
import IconButton from "../components/IconButton/IconButton";

export default function Lights({ HOST_IP, API_KEY }) {
  const [lights, setLights] = useState({});
  const [lightsCatalog, setlightsCatalog] = useState({});
  const [modelIds, setModelIds] = useState([]);

  const [WizardIsOpen, setWizardIsOpen] = useState(false);

  const openWizard = () => {
    setWizardIsOpen(true);
  };

  const closeWizard = () => {
    setWizardIsOpen(false);
  };

  const searchForLights = () => {
    if (API_KEY !== undefined) {
      axios
        .post(`${HOST_IP}/api/${API_KEY}/lights`, "")
        .then((fetchedData) => {
          //console.log(fetchedData.data);
          toast.success("Searching for new lights...");
        })
        .catch((error) => {
          console.error(error);
          toast.error(`Error occurred: ${error.message}`);
        });
    }
  };

  useEffect(() => {
    const fetchLights = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/lights`)
          .then((fetchedData) => {
            //console.log(fetchedData.data);
            setLights(fetchedData.data);
          })
          .catch((error) => {
            console.error(error);
            toast.error(`Error occurred: ${error.message}`);
          });
      }
    };

    const fetchModelIds = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/light-types`)
          .then((fetchedData) => {
            //console.log(fetchedData.data);
            setModelIds(fetchedData.data["result"]);
          })
          .catch((error) => {
            console.error(error);
            toast.error(`Error occurred: ${error.message}`);
          });
      }
    };

    const fetchLightsCatalog = () => {
      if (API_KEY !== undefined) {
        axios
          .get(
            `https://raw.githubusercontent.com/diyhue/Lights/master/catalog.json`
          )
          .then((fetchedData) => {
            //console.log(fetchedData.data);
            setlightsCatalog(fetchedData.data);
          })
          .catch((error) => {
            console.error(error);
            toast.error(`Error occurred: ${error.message}`);
          });
      }
    };

    fetchLights();
    fetchModelIds();
    fetchLightsCatalog();
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
            title="Add light"
            size="big"
            color="btn"
            label="Add light"
            onClick={() => openWizard()}
          />

          <IconButton
            iconName={ScanIcon}
            title="Scan for lights"
            size="big"
            color="btn"
            label="Scan for lights"
            onClick={() => searchForLights()}
          />
        </CardGrid>

        <CardGrid>
          {Object.entries(lights).map(([id, light]) => (
            <Light
              key={id}
              HOST_IP={HOST_IP}
              api_key={API_KEY}
              id={id}
              light={light}
              modelIds={modelIds}
              lightsCatalog={lightsCatalog}
            />
          ))}
        </CardGrid>
      </div>

      <Wizard
        isOpen={WizardIsOpen}
        closeWizard={closeWizard}
        headline="Add Light"
      >
        <AddLight HOST_IP={HOST_IP} API_KEY={API_KEY} closeWizard={closeWizard}></AddLight>
      </Wizard>
    </div>
  );
}
