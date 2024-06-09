import React, { useEffect, useState } from "react";

import axios from "axios";

import Layout from "./Mainframe/Layout";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const App = () => {
  const [API_KEY, setAPI_KEY] = useState();

  const HOST_IP = ""; // Pass the IP (http://x.x.x.x) of the diyHue Bridge, if running through npm start

  useEffect(() => {
    //console.log(`${HOST_IP}/get-key`);
    axios
      .get(`${HOST_IP}/get-key`)
      .then((result) => {
        if (typeof result.data === "string" && result.data.length === 32) {
          //console.log(`API_KEY from API: ${result.data}`);
          setAPI_KEY(result.data);
        } else {
          console.error(`Unable to fetch API_KEY! from ${HOST_IP}/get-key`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <React.Suspense fallback={loading}>
      <Layout HOST_IP={HOST_IP} API_KEY={API_KEY} />
    </React.Suspense>
  );
};

export default App;
