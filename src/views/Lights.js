import React, { useEffect, useState } from "react";
import axios from "axios";
import Light from "../containers/Light";
import AddLight from "../containers/AddLight";
import Flash from "../containers/Flash";
import { BsPlusCircle } from 'react-icons/bs';
import { ReactComponent as ScanIcon } from '../icons/scan.svg';

export default function Lights({ HOST_IP, API_KEY }) {
  const [lights, setLights] = useState({});
  const [lightsCatalog, setlightsCatalog] = useState({});
  const [modelIds, setModelIds] = useState([]);
  const [type, setType] = useState("none");
  const [message, setMessage] = useState("no message");
  const [lightForm, setLightForm] = useState(false);

  const searchForLights = () => {
    if (API_KEY !== undefined) {
      axios
        .post(`${HOST_IP}/api/${API_KEY}/lights`, "")
        .then((fetchedData) => {
          console.log(fetchedData.data);
          setMessage("Searching for new lights...");
          setType("none");
          setType("success");
        })
        .catch((error) => {
          console.error(error);
          setMessage("Error occured, check browser console");
          setType("none");
          setType("error");
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
        <div className="devicecontainer">
      {type !== "none" && (
        <Flash
          type={type}
          message={message}
          duration="5000"
          setType={setType}
        />
      )}

      <div className="actionBar">
        <div className="btn" onClick={() => setLightForm(!lightForm)}>
          <BsPlusCircle />
          <p>Add light</p>
          </div>
        <div className="btn" onClick={() => searchForLights()}>
        <ScanIcon />
          <p>Scan for lights</p>
          </div>
      </div>

      
        {lightForm && <AddLight
          setType={setType}
          setMessage={setMessage}
          HOST_IP={HOST_IP}
          API_KEY={API_KEY}>
        </AddLight>}
      
      <div className="cardGrid">
        {Object.entries(lights).map(([id, light]) => (
          <Light
            key={id}
            HOST_IP={HOST_IP}
            api_key={API_KEY}
            id={id}
            light={light}
            modelIds={modelIds}
            setType={setType}
            setMessage={setMessage}
            lightsCatalog={lightsCatalog}
          />
        ))}
      </div>
    </div>
    </div>
    </div>
  );
}
