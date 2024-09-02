import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import { saveAs } from "file-saver";

import FlipSwitch from "../components/FlipSwitch/FlipSwitch";
import GenericButton from "../components/GenericButton/GenericButton";
import GenericText from "../components/GenericText/GenericText";
import SelectMenu from "../components/SelectMenu/SelectMenu";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";
import Wizard from "../components/Wizard/Wizard";
import CardGrid from "../components/CardGrid/CardGrid";

import "react-confirm-alert/src/react-confirm-alert.css";

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
  const [WizardContent, setWizardContent] = useState({});
  const [AdvanceConfig, setAdvanceConfig] = useState(false);
  const [UpdateTime, setUpdateTime] = useState("");

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
            //console.log(fetchedData.data);
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
        //console.log(result.data);
        setBridgeName(result.data["name"]);
        setSwversion(result.data["swversion"]);
        setApiVersion(result.data["apiversion"]);
        setDiscovery(result.data["discovery"]);
        setRemoteApi(result.data["Remote API enabled"]);
        setTimezone(result.data["timezone"]);
        setUpdateTime(result.data["swupdate2"]["autoinstall"]["updatetime"].replace("T", ""))
        setReadonlyConf(result.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${HOST_IP}/info`)
      .then((result) => {
        //console.log(result.data);
        setDebugInfo(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [HOST_IP, API_KEY]);

  const onSubmit = () => {
    //console.log("submit");
    //e.preventDefault();
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        name: bridgeName,
        swversion: swversion,
        apiversion: apiVersion,
        timezone: timezone,
        "Remote API enabled": remoteApi,
        discovery: discovery,
      })
      .then((fetchedData) => {
        //console.log(fetchedData.data);
        toast.success("Successfully saved");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  const ConfigOptions = () => {
    setWizardName("Force Config Dump Options");
    setWizardContent(
      <>
        <p>Where do you want to save config?</p>
        <p>Never share the config.tar!</p>
        <div className="form-control">
          <GenericButton
            value="DiyHue local"
            color="blue"
            size=""
            type="submit"
            onClick={() => dumpConfig(false)}
          />
        </div>
        <div className="form-control">
          <GenericButton
            value="DiyHue backup"
            color="blue"
            size=""
            type="submit"
            onClick={() => backupConfig()}
          />
        </div>
        <div className="form-control">
          <GenericButton
            value="Download tar"
            color="blue"
            size=""
            type="submit"
            onClick={() => downloadConfig()}
          />
        </div>
      </>
    );
    openWizard();
  };

  const dumpConfig = (restart) => {
    axios
      .get(`${HOST_IP}/save`)
      .then(() => {
        toast.success("Config dumped to local disk");
        if (restart === true){
          Restart();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    closeWizard()
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
    closeWizard()
  };

  const downloadConfig = () => {
    axios
      .get(`${HOST_IP}/download_config`, { responseType: "blob" })
      .then((response) => {
        saveAs(response.data, "config.tar");
        toast.success("Download config tar");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    closeWizard()
  };

  const RestartAlert = () => {
    confirmAlert({
      title: "Restart Python.",
      message:
        "Are you sure to do this?\nThis will NOT save the current config.",
      buttons: [
        {
          label: "Yes",
          onClick: () => Restart(),
        },
        {
          label: "Save first",
          onClick: () => dumpConfig(true),
        },
        {
          label: "No",
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
      })
  };

  const restoreOptions = () => {
    setWizardName("Reset Config Options");
    setWizardContent(
      <>
        <p>How do you want to restore config?</p>
        <p>Please be careful of what you do!</p>
        <div className="form-control">
          <GenericButton
            value="Restore backup"
            color="blue"
            size=""
            type="submit"
            onClick={() => restoreAlert()}
          />
        </div>
        <div className="form-control">
          <GenericButton
            value="Reset config"
            color="blue"
            size=""
            type="submit"
            onClick={() => resetAlert()}
          />
        </div>
      </>
    );
    openWizard();
  };

  const resetAlert = () => {
    confirmAlert({
      title: "Reset config to default.",
      message: "Are you sure to do this?\nThis also makes a backup.",
      buttons: [
        {
          label: "Yes",
          onClick: () => reset_config(),
        },
        {
          label: "No",
        },
      ],
    });
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
    closeWizard()
  };

  const restoreAlert = () => {
    confirmAlert({
      title: "Restore config from backup.",
      message: "Are you sure to do this?\nThis will NOT make a backup.",
      buttons: [
        {
          label: "Yes",
          onClick: () => restore_config(),
        },
        {
          label: "No",
        },
      ],
    });
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
    closeWizard()
  };

  const debugOptions = () => {
    setWizardName("Debug download Options");
    setWizardContent(
      <>
        <p>Download full debug or log</p>
        <div className="form-control">
          <GenericButton
            value="Full Debug"
            color="blue"
            size=""
            type="submit"
            onClick={() => downloadDebugConfig()}
          />
        </div>
        <div className="form-control">
          <GenericButton
            value="Log file"
            color="blue"
            size=""
            type="submit"
            onClick={() => downloadLog()}
          />
        </div>
      </>
    );
    openWizard();
  };

  const downloadDebugConfig = () => {
    axios
      .get(`${HOST_IP}/download_debug`, { responseType: "blob" })
      .then((response) => {
        saveAs(response.data, "config_debug.tar");
        toast.success("Download debug tar");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    closeWizard()
  };

  const downloadLog = () => {
    axios
      .get(`${HOST_IP}/download_log`, { responseType: "blob" })
      .then((response) => {
        saveAs(response.data, "diyhue_log.tar");
        toast.success("Download log tar");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });

    closeWizard()
  };

  let options = timezones.map(function (timezone) {
    return { value: timezone, label: timezone };
  });

  return (
    <div className="inner">
      <CardGrid options="main">
        <GlassContainer options="spacer">
          <PageContent>
            <div className="headline">Bridge Config</div>
            <div className="form-control">
              <GenericText
                label="Bridge Name"
                type="text"
                placeholder="Bridge Name"
                value={bridgeName}
                onChange={(e) => setBridgeName(e)}
              />
            </div>
            <div className="form-control">
              <GenericText
                label={`Software Version (checks automatic at ${UpdateTime})`}
                type="number"
                pattern="[0-9]+"
                placeholder="swversion"
                value={swversion}
                onChange={(e) => setSwversion(e)}
              />
              <p>
                <a href="https://www.philips-hue.com/en-gb/support/release-notes/bridge">
                  check here for last versions
                </a>
              </p>
            </div>
            <div className="form-control">
              <GenericText
                label={`API Version (checks automatic at ${UpdateTime})`}
                type="text"
                placeholder="apiversion"
                value={apiVersion}
                onChange={(e) => setApiVersion(e)}
              />
            </div>
            <div className="form-control">
              <SelectMenu
                label="Timezone"
                options={options}
                onChange={(e) => setTimezone(e)}
                placeholder={timezone}
              />
            </div>
            <div className="form-control">
              <FlipSwitch
                id="Remote API"
                value={remoteApi}
                onChange={(e) => setRemoteApi(e)}
                checked={remoteApi}
                label="Remote API"
                position="right"
              />
            </div>
            <div className="form-control">
              <FlipSwitch
                id="Discovery"
                value={discovery}
                onChange={(e) => setDiscovery(e)}
                checked={discovery}
                label="Discovery"
                position="right"
              />
            </div>
            <div className="form-control">
              <GenericButton
                value="Save"
                color="blue"
                size=""
                type="submit"
                onClick={() => onSubmit()}
              />
            </div>
          </PageContent>
        </GlassContainer>

        <GlassContainer options="spacer">
          <PageContent>
            <div className="headline">Readonly Config</div>
            <div className="form-control">
              <GenericText
                label="BridgeID"
                readOnly={true}
                type="text"
                placeholder="bridgeid"
                value={readonlyConf["bridgeid"]}
              />
            </div>
            <div className="form-control">
              <GenericText
                label="Ip Address"
                readOnly={true}
                type="text"
                placeholder="ip"
                value={readonlyConf["ipaddress"]}
              />
            </div>
            <div className="form-control">
              <GenericText
                label="Gateway"
                readOnly={true}
                type="text"
                placeholder="gateway"
                value={readonlyConf["gateway"]}
              />
            </div>
            <div className="form-control">
              <GenericText
                label="Mac"
                readOnly={true}
                type="text"
                placeholder="mac"
                value={readonlyConf["mac"]}
              />
            </div>
            <div className="form-control">
              <GenericText
                label="Local time"
                readOnly={true}
                type="text"
                placeholder="time"
                value={new Date(readonlyConf["localtime"])}
              />
            </div>
          </PageContent>
        </GlassContainer>

        <GlassContainer options="spacer">
          <PageContent>
            <div className="headline">
              System debug information: (Work in progress)
            </div>
            <div className="form-control">
              <label>Hue-Emulator Version: {DebugInfo["diyhue"]}</label>
              <label>WebUI Version: {DebugInfo["webui"]}</label>
              <label>Architecture: {DebugInfo["machine"]}</label>
              <label>OS: {DebugInfo["sysname"]}</label>
              <label>
                {DebugInfo["sysname"]} version: {DebugInfo["os_version"]}
              </label>
              <label>
                {DebugInfo["sysname"]} release: {DebugInfo["os_release"]}
              </label>
              <label>Hardware: %Hardware%</label>
            </div>
          </PageContent>
        </GlassContainer>

        <GlassContainer options="spacer">
          <PageContent>
            <div className="headline">Bridge control</div>
            <div className="form-control">
              <GenericButton
                value={`${AdvanceConfig ? "Hide" : "Show"} advanced config`}
                color="blue"
                size=""
                type="submit"
                onClick={() => setAdvanceConfig(!AdvanceConfig)}
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
                value="Download debug"
                color="blue"
                size=""
                type="submit"
                onClick={() => debugOptions()}
              />
            </div>
            {AdvanceConfig === true && (<>
              <div className="form-control">
                <GenericButton
                  value="Restart Python"
                  color="red"
                  size=""
                  type="submit"
                  onClick={() => RestartAlert()}
                />
              </div>
              <div className="form-control">
                <GenericButton
                  value="Force Config Reset"
                  color="red"
                  size=""
                  type="submit"
                  onClick={() => restoreOptions()}
                />
              </div>
            </>)}
            <Wizard
              isOpen={WizardIsOpen}
              closeWizard={closeWizard}
              headline={WizardName}
            >
              {WizardContent}
            </Wizard>
          </PageContent>
        </GlassContainer>
      </CardGrid>
    </div>
  );
};

export default Bridge;
