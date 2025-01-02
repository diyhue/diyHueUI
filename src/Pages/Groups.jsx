import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import Group from "../components/Group/Group";
import RoomSetup from "../components/RoomSetup/RoomSetup";
import CardGrid from "../components/CardGrid/CardGrid";

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
            const { config, lights, groups, scenes } = fetchedData.data;
            setConfig((prevConfig) => {
              if (
                JSON.stringify(prevConfig.lights) !== JSON.stringify(lights) ||
                JSON.stringify(prevConfig.groups) !== JSON.stringify(groups)
              ) {
                //console.log("Updating config");
                return { config, lights, groups, scenes };
              }
              //console.log("No changes to config");
              return prevConfig;
            });
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
    <div className="inner" key={JSON.stringify(config)}>
      <CardGrid>
        {Object.keys(config.groups).length === 0 ? <RoomSetup /> : <></>}
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
      </CardGrid>
    </div>
  );
}
