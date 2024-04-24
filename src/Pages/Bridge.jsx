import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import Select from "react-select"
import FlipSwitch from "../components/FlipSwitch/FlipSwitch";
import PageContent from "../components/PageContent/PageContent";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import GenericButton from "../components/GenericButton/GenericButton";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { saveAs } from 'file-saver';
import Wizard from "../components/Wizard/Wizard";


const Bridge = ({ HOST_IP, API_KEY }) => {
  const [bridgeName, setBridgeName] = useState("");
  const [swversion, setSwversion] = useState("");
  const [apiVersion, setApiVersion] = useState("");
  const [remoteApi, setRemoteApi] = useState(false);
  const [discovery, setDiscovery] = useState(true);
  const [timezone, setTimezone] = useState("");
  const [timezones, setTimezones] = useState([]);
  const [readonlyConf, setReadonlyConf] = useState({});
  const [DebugInfo, setDebugInfo] = useState({});
  const [WizardIsOpen, setWizardIsOpen] = useState(false);
  const [WizardName, setWizardName] = useState("");

  const openWizard = () => {
    setWizardIsOpen(true);
  };

  const closeWizard = () => {
    setWizardIsOpen(false);
  };

  useEffect(() => {
    const fetchTimezones = () => {
      if (API_KEY !== undefined) {
        axios
          .get(`${HOST_IP}/api/${API_KEY}/info/timezones`)
          .then((fetchedData) => {
            console.log(fetchedData.data);
            setTimezones(fetchedData.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    fetchTimezones();
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config`)
      .then((result) => {
        setBridgeName(result.data["name"]);
        setSwversion(result.data["swversion"]);
        setApiVersion(result.data["apiversion"]);
        setDiscovery(result.data["discovery"]);
        setRemoteApi(result.data["Remote API enabled"]);
        setTimezone(result.data["timezone"]);
        setReadonlyConf(result.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${HOST_IP}/info`)
      .then((result) => {
        console.log(result.data);
        setDebugInfo(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [HOST_IP, API_KEY]);

  const onSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        name: bridgeName,
        swversion: swversion,
        apiversion: apiVersion,
        timezone: timezone,
        "Remote API enabled": remoteApi,
        discovery: discovery
      })
      .then((fetchedData) => {
        console.log(fetchedData.data);
        toast.success("Successfully saved");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  const dumpConfig = () => {
    axios
      .get(`${HOST_IP}/save`)
      .then(() => {
        toast.success("Config dumped to local disk");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  const backupConfig = () => {
    axios
      .get(`${HOST_IP}/save?backup=True`)
      .then(() => {
        toast.success("Backup to local disk");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  const downloadConfig = () => {
    axios
      .get(`${HOST_IP}/download_config`, { responseType: 'blob' })
      .then((response) => {
        saveAs(response.data, "config.tar");
        toast.success("Download config tar");

      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  const ConfigOptions = () => {
    confirmAlert({
      title: "Force Config Dump Options",
      message: "Where do you want to save config?",
      buttons: [
        {
          label: "DiyHue local",
          onClick: () => dumpConfig(),
        },
        {
          label: "DiyHue backup",
          onClick: () => backupConfig(),
        },
        {
          label: "Download tar",
          onClick: () => downloadConfig(),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const Restart = () => {
    axios
      .get(`${HOST_IP}/restart`)
      .then(() => {
        toast.success("Restart Python");
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          toast.success("Restart Python");
        } else {
          console.error(error);
          toast.error(`Error occurred: ${error.message}`);
        }
      });
  };

  const resetAlert = () => {
    if (window.confirm("Are you sure to do this?\nThis also makes a backup")) {
      reset_config();
    }
  };

  const reset_config = () => {
    axios
      .get(`${HOST_IP}/reset_config`)
      .then(() => {
        toast.success("Reset config");
        Restart();
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  const restoreAlert = () => {
    if (window.confirm("Are you sure to do this?\nThis will NOT make a backup")) {
      restore_config();
    }
  };

  const restore_config = () => {
    axios
      .get(`${HOST_IP}/restore_config`)
      .then(() => {
        toast.success("restore config");
        Restart();
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  const restoreOptions = () => {
    confirmAlert({
      title: "Reset Config Options",
      message: "How do you want to restore config?",
      buttons: [
        {
          label: "Restore backup",
          onClick: () => restoreAlert(),
        },
        {
          label: "Reset defaults",
          onClick: () => resetAlert(),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const debugOptions = () => {
    confirmAlert({
      title: "Debug download Options",
      message: "Download full debug or log",
      buttons: [
        {
          label: "Full Debug",
          onClick: () => downloadDebugConfig(),
        },
        {
          label: "Log file",
          onClick: () => downloadLog(),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const downloadDebugConfig = () => {
    axios
      .get(`${HOST_IP}/download_debug`, { responseType: 'blob' })
      .then((response) => {
        saveAs(response.data, "config_debug.tar");
        toast.success("Download debug tar");

      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  const downloadLog = () => {
    axios
      .get(`${HOST_IP}/download_log`, { responseType: 'blob' })
      .then((response) => {
        saveAs(response.data, "diyhue.log");
        toast.success("Download log file");

      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  let options = timezones.map(function (timezone) {
    return { value: timezone, label: timezone };
  })


  return (
    <div className="inner">
      <GlassContainer options="spacer">
        <PageContent>
          <div className="headline">Bridge Config</div>
          <form className="add-form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-control">
              <label>Bridge Name</label>
              <input
                type="text"
                placeholder="Bridge Name"
                value={bridgeName}
                onChange={(e) => setBridgeName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Software Version</label>
              <input
                type="number"
                pattern="[0-9]+"
                placeholder="swversion"
                value={swversion}
                onChange={(e) => setSwversion(e.target.value)}
              />
              <p>
                <a href="https://www.philips-hue.com/en-gb/support/release-notes/bridge">
                  check here for last versions
                </a>
              </p>
            </div>
            <div className="form-control">
              <label>API Version</label>
              <input
                type="text"
                placeholder="apiversion"
                value={apiVersion}
                onChange={(e) => setApiVersion(e.target.value)}
              />
            </div>
            <div className="form-control dropdown">
              <label>Timezone</label>
              <Select
                options={options}
                onChange={(e) => setTimezone(e.value)}
                placeholder={timezone}
              />
            </div>
            <FlipSwitch
              value={remoteApi}
              onChange={(e) => setRemoteApi(e)}
              checked={remoteApi}
              label="Remote API"
            />

            <FlipSwitch
              value={discovery}
              onChange={(e) => setDiscovery(e)}
              checked={discovery}
              label="Discovery"
            />
            <div className="form-control">
              <GenericButton
                value="Save"
                color="blue"
                size=""
                type="submit"
              />
            </div>
          </form>
        </PageContent>
      </GlassContainer>

      <GlassContainer options="spacer">
        <PageContent>
          <div className="headline">Readonly Config</div>
          <div className="form-control">
            <label>BridgeID</label>
            <input
              readOnly
              type="text"
              placeholder="bridgeid"
              value={readonlyConf["bridgeid"]}
            />
          </div>
          <div className="form-control">
            <label>Ip Address</label>
            <input
              readOnly
              type="text"
              placeholder="ip"
              value={readonlyConf["ipaddress"]}
            />
          </div>
          <div className="form-control">
            <label>Gateway</label>
            <input
              readOnly
              type="text"
              placeholder="gateway"
              value={readonlyConf["gateway"]}
            />
          </div>
          <div className="form-control">
            <label>Mac</label>
            <input
              readOnly
              type="text"
              placeholder="mac"
              value={readonlyConf["mac"]}
            />
          </div>
          <div className="form-control">
            <label>Local time</label>
            <input
              readOnly
              type="text"
              placeholder="time"
              value={Date(readonlyConf["localtime"])}
            />
          </div>
        </PageContent>
      </GlassContainer>

      <GlassContainer options="spacer">
        <PageContent>
          <div className="headline">System debug information: (Work in progrss)</div>
          <div className="form-control">
            <label>Hue-Emulator Version: {DebugInfo["diyhue"]}</label>
            <label>Architecture: {DebugInfo["machine"]}</label>
            <label>OS: {DebugInfo["sysname"]}</label>
            <label>{DebugInfo["sysname"]} version: {DebugInfo["os_version"]}</label>
            <label>{DebugInfo["sysname"]} release: {DebugInfo["os_release"]}</label>
            <label>Hardware: %Hardware%</label>
          </div>
        </PageContent>
      </GlassContainer>

      <GlassContainer options="spacer">
        <PageContent>
          <div className="headline">Bridge control</div>
          <div className="form-control">
            <GenericButton
              value="Restart Python"
              color="blue"
              size=""
              type="submit"
              onClick={() => Restart()}
            />
          </div>
          <div className="form-control">
            <GenericButton
              value="Force Config Dump"
              color="blue"
              size=""
              type="submit"
              onClick={() => ConfigOptions()}
            />
          </div>
          <div className="form-control">
            <GenericButton
              value="Force Config Reset"
              color="blue"
              size=""
              type="submit"
              onClick={() => restoreOptions()}
            />
          </div>
          <div className="form-control">
            <GenericButton
              value="Download debug"
              color="blue"
              size=""
              type="submit"
              onClick={() => debugOptions()}
            />
          </div>
          <Wizard isOpen={WizardIsOpen} closeWizard={closeWizard} headline="WizardName">
          </Wizard>
        </PageContent>
      </GlassContainer>
    </div>


  );
};

export default Bridge;
