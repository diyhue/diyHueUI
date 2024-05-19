import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import CardGrid from "../components/CardGrid/CardGrid";
import User from "../components/User/User";

const Config = ({ HOST_IP, API_KEY }) => {
  const [whitelist, setWhitelist] = useState({});

  useEffect(() => {
    const fetchConfig = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/api/${API_KEY}/config`)
          .then((fetchedData) => {
            //console.log(fetchedData.data);
            setWhitelist(fetchedData.data.whitelist);
          })
          .catch((error) => {
            console.error(error);
            toast.error(`Error occurred: ${error.message}`, { duration: 5000 });
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
        <CardGrid>
          {Object.entries(whitelist).map(([id, user]) => (
            <User
              key={id}
              HOST_IP={HOST_IP}
              api_key={API_KEY}
              id={id}
              user={user}
              whitelist={whitelist}
            />
          ))}
        </CardGrid>
      </div>
  );
};

export default Config;
