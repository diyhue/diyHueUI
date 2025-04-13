import React, { useEffect, useState } from "react";

import axios from "axios";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Layout from "./Mainframe/Layout";
import loading from "./components/Loader/Loader";

const App = () => {
  const [API_KEY, setAPI_KEY] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const HOST_IP = ""; // Pass the IP (http://x.x.x.x) of the diyHue Bridge, if running through npm start

  useEffect(() => {
    axios
      .get(`${HOST_IP}/get-key`)
      .then((result) => {
        if (typeof result.data === "string" && result.data.length === 32) {
          setAPI_KEY(result.data);
        } else {
          console.error(`Unable to fetch API_KEY! from ${HOST_IP}/get-key`);
          toast.error("Unable to fetch API_KEY!");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false); // Ensure loading is set to false after the request
      });
  }, []);

  if (isLoading) {
    //console.log("Loading API_KEY...");
    return loading("API KEY"); // Show loading spinner while fetching API_KEY
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <React.Suspense fallback={loading}>
        <Layout HOST_IP={HOST_IP} API_KEY={API_KEY} />
      </React.Suspense>
    </LocalizationProvider>
  );
};

export default App;
