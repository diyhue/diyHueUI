import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Mainframe/Layout";


import "./scss/content.scss";
import "./scss/forms.scss";
import "./scss/groups.scss";
import "./scss/notification.scss";
import "./scss/modal.scss";
import "./scss/scenepicker.scss";


import "./scss/components/actionbuttons.scss";
import "./scss/components/flipswitch.scss";
import "./scss/components/scrollbar.scss";
import "./scss/components/slider.scss";
import "./scss/components/switches.scss";
import "./scss/components/devicecard.scss";
import "./scss/components/addlight.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const App = () => {
  const [API_KEY, setAPI_KEY] = useState();

  const HOST_IP = "http://192.168.2.10"; // Pass the IP (http://x.x.x.x) of the diyHue Bridge, if running through npm start

  useEffect(() => {
    //console.log(`${HOST_IP}/get-key`);
    axios
      .get(`${HOST_IP}/get-key`)
      .then((result) => {
        if (typeof result.data === "string" && result.data.length === 32) {
          //console.log(`API_KEY from API: ${result.data}`);
          setAPI_KEY(result.data);
        } else {
          console.log(`Unable to fetch API_KEY! from ${HOST_IP}/get-key`);
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
