import React, { useEffect, useState } from "react";
import axios from "axios";
import Group from "../containers/Group";
import RoomSetup from "../containers/RoomSetup";
import { toast } from 'react-hot-toast';

export default function Groups({ HOST_IP, API_KEY }) {
  const [config, setConfig] = useState({
    config: {},
    lights: {},
    groups: {},
    scenes: {},
  });

  useEffect(() => {
    const fetchConfig = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/api/${API_KEY}`)
          .then((fetchedData) => {
            //console.log(fetchedData.data);
            setConfig(fetchedData.data);
          })
          .catch((error) => {
            console.error(error);
            toast.error(`Error occurred: ${error.message}`);
          });
      }
    };

    fetchConfig();
    const interval = setInterval(() => {
      fetchConfig();
    }, 2000); // <<-- ⏱ 1000ms = 1s
    return () => clearInterval(interval);
  }, [HOST_IP, API_KEY]);

  return (
    <div className="inner">
      <div className="cardGrid">
        {Object.keys(config.groups).length === 0 ? ( <RoomSetup /> ): (<></>)}
        {Object.entries(config.groups)
          .filter((group) => group[1].type !== "Entertainment")
          .map(([id, group]) => (
            <Group
              key={id}
              api_key={API_KEY}
              HOST_IP={HOST_IP}
              id={id}
              group={group}
              lights={config.lights}
              scenes={config.scenes}
            />
          ))}
      </div>
    </div>
  );
}