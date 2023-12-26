import { useState, useEffect } from "react";
import axios from "axios";
import Device from "../containers/Device";
import { toast } from 'react-hot-toast';

const Devices = ({ HOST_IP, API_KEY }) => {
  const [devices, setDevices] = useState({});

  useEffect(() => {
    const fetchDevices = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/sensors`)
          .then((fetchedData) => {
            console.log(fetchedData.data);
            setDevices(fetchedData.data);
          })
          .catch((error) => {
            console.error(error);
            toast.error(`Error occurred: ${error.message}`, { duration: 5000 });
          });
      }
    };

    fetchDevices();
    const interval = setInterval(() => {
      fetchDevices();
    }, 2000); // <<-- ⏱ 1000ms = 1s
    return () => clearInterval(interval);
  }, [HOST_IP, API_KEY]);

  return (
    <div className="content">
      <div className="inner">
        <div className="devicecontainer">
          <div className="cardGrid">
            {Object.entries(devices).map(([id, device]) => (
              device["protocol"] !== "none" &&
              <Device
                key={id}
                HOST_IP={HOST_IP}
                api_key={API_KEY}
                id={id}
                device={device}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;