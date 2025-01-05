import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { toast } from "react-hot-toast";

import ContentSection from "./ContentSection";
import SidebarSection from "./SidebarSection";
import HeaderSection from "./HeaderSection";

import "./layout.scss";
import "./scrollbar.scss";

const Layout = ({ HOST_IP, API_KEY }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 750px)` });
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [config, setConfig] = useState({
    config: {},
    lights: {},
    groups: {},
    scenes: {},
    group0: {},
  });

  useEffect(() => {
    const fetchConfig = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/api/${API_KEY}`)
          .then((fetchedData) => {
            //console.log(fetchedData.data["swupdate2"]["state"]);
            const { config, lights, groups, scenes } = fetchedData.data;
            setConfig((prevConfig) => {
              if (
                JSON.stringify(prevConfig.lights) !== JSON.stringify(lights) ||
                JSON.stringify(prevConfig.groups) !== JSON.stringify(groups) ||
                JSON.stringify(prevConfig.scenes) !== JSON.stringify(scenes) ||
                JSON.stringify(prevConfig.config["swupdate2"]) !== JSON.stringify(config["swupdate2"])
              ) {
                //console.log("Updating config");
                return { ...prevConfig, config, lights, groups, scenes };
              }
              //console.log("No changes to config");
              return prevConfig;
            });
          })
          .catch((error) => {
            console.error(error);
            toast.error(`Error occurred: ${error.message}`);
          });
        axios
          .get(`${HOST_IP}/api/${API_KEY}/groups/0`)
          .then((fetchedData) => {
            const group0 = fetchedData.data;
            setConfig((prevConfig) => {
              if (
                JSON.stringify(prevConfig.group0) !== JSON.stringify(group0)
              ) {
                //console.log("Updating config");
                return { ...prevConfig, group0 };
              }
              //console.log("No changes to config");
              return prevConfig;
            });
          })
          .catch((error) => {
            console.error(error);
            toast.error(`Error occurred: ${error.message}`);
          });
          //console.log("fetched config", config);
      }
    };

    fetchConfig();
    const interval = setInterval(() => {
      fetchConfig();
    }, 2000); // <<-- ⏱ 1000ms = 1s
    return () => clearInterval(interval);
  }, [HOST_IP, API_KEY]);
  

  return (
    <>
      <SidebarSection
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        isMobile={isMobile}
      />
      {Object.keys(config.config).length > 0 && (
        <div className="columnRight">
          <HeaderSection
            HOST_IP={HOST_IP}
            API_KEY={API_KEY}
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            CONFIG={config}
          />
          <ContentSection
            HOST_IP={HOST_IP}
            API_KEY={API_KEY}
            CONFIG={config}
          />
        </div>
      )}
    </>
  );
};

export default Layout;
