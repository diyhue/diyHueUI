import { useState, useEffect } from "react";
import axios from "axios";
import Users from "../components/Users/Users";
import { toast } from 'react-hot-toast';

const Config = ({ HOST_IP, API_KEY }) => {
  const [whitelist, setWhitelist] = useState({});

  useEffect(() => {
    const fetchConfig = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/api/${API_KEY}/config`)
          .then((fetchedData) => {
            console.log(fetchedData.data);
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
    <div className="content">
      <div className="inner">
        <div className="devicecontainer">
          <div className="cardGrid">
            {Object.entries(whitelist).map(([id, user]) => (
              <Users
                key={id}
                HOST_IP={HOST_IP}
                api_key={API_KEY}
                id={id}
                user={user}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Config;