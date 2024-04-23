import React, { useEffect, useState } from "react";
import axios from "axios";
import Light from "../components/Light/Light";
import AddLight from "../components/AddLight/AddLight";
import { BsPlusCircle } from 'react-icons/bs';
import { ReactComponent as ScanIcon } from '../static/icons/scan.svg';
import { toast } from 'react-hot-toast';
import CardGrid from "../components/CardGrid/CardGrid";
import Wizard from "../components/Wizard/Wizard";

import "./lights.scss"

export default function Lights({ HOST_IP, API_KEY }) {
  const [lights, setLights] = useState({});
  const [lightsCatalog, setlightsCatalog] = useState({});
  const [modelIds, setModelIds] = useState([]);
  const [lightForm, setLightForm] = useState(false);

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
          console.log(fetchedData.data);
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
            console.log(fetchedData.data);
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
            console.log(fetchedData.data);
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
          .get(`https://raw.githubusercontent.com/diyhue/Lights/master/catalog.json`)
          .then((fetchedData) => {
            console.log(fetchedData.data);
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
          <div className="actionBar">
            <div className="btn" onClick={openWizard}>
              <BsPlusCircle />
              <p>Add light</p>
              </div>
            <div className="btn" onClick={() => searchForLights()}>
            <ScanIcon />
              <p>Scan for lights</p>
              </div>
          </div>
      
          {/*{lightForm && <AddLight
            HOST_IP={HOST_IP}
            API_KEY={API_KEY}>
          </AddLight>}*/}
      
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

        <Wizard isOpen={WizardIsOpen} closeWizard={closeWizard} headline="Add Light">
          <AddLight
              HOST_IP={HOST_IP}
              API_KEY={API_KEY}>
            </AddLight>
        </Wizard>

    </div>
  );
}