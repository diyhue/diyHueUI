import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import FlipSwitch from "../components/FlipSwitch/FlipSwitch";
import GenericButton from "../components/GenericButton/GenericButton";
import GenericText from "../components/GenericText/GenericText";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";
import CardGrid from "../components/CardGrid/CardGrid";

const Settings = ({ HOST_IP, API_KEY }) => {
  const [port_enable, setPort_Enable] = useState(false);
  const [port, setPort] = useState("80");
  const [yeelight, setYeelight] = useState(true);
  const [native_multi, setNative_multi] = useState(true);
  const [tasmota, setTasmota] = useState(true);
  const [wled, setWled] = useState(true);
  const [shelly, setShelly] = useState(true);
  const [esphome, setEsphome] = useState(true);
  const [hyperion, setHyperion] = useState(true);
  const [tpkasa, setTpkasa] = useState(true);
  const [elgato, setElgato] = useState(true);
  const [IP_RANGE_START, setIpRangeStart] = useState(Number);
  const [IP_RANGE_END, setIpRangeStop] = useState(Number);
  const [SUB_IP_RANGE_START, setSubIpRangeStart] = useState(Number);
  const [SUB_IP_RANGE_END, setSubIpRangeStop] = useState(Number);
  const [IP, setIp] = useState("");
  const [ScanOnHostIP, setScanOnHostIP] = useState("");

  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/port`)
      .then((result) => {
        setEnable(result.data["enabled"]);
        setPort(result.data["ports"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/yeelight`)
      .then((result) => {
        setYeelight(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/native_multi`)
      .then((result) => {
        setNative_multi(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/tasmota`)
      .then((result) => {
        setTasmota(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/wled`)
      .then((result) => {
        setWled(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/shelly`)
      .then((result) => {
        setShelly(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/esphome`)
      .then((result) => {
        setEsphome(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/hyperion`)
      .then((result) => {
        setHyperion(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/tpkasa`)
      .then((result) => {
        setTpkasa(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/elgato`)
      .then((result) => {
        setElgato(result.data["enabled"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/IP_RANGE`)
      .then((result) => {
        setIpRangeStart(result.data["IP_RANGE_START"]);
        setIpRangeStop(result.data["IP_RANGE_END"]);
        setSubIpRangeStart(result.data["SUB_IP_RANGE_START"]);
        setSubIpRangeStop(result.data["SUB_IP_RANGE_END"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config`)
      .then((result) => {
        setIp(result.data["ipaddress"].replace("http://", ""));
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/scanonhostip`)
      .then((result) => {
        setScanOnHostIP(result.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  }, [HOST_IP, API_KEY]);

  const onSubmit = () => {
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        port: { enabled: port_enable, ports: port.toString().match(/\d+/g).map(Number) },
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

  const onSubmit_protocol = () => {
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        yeelight: { enabled: yeelight },
        native_multi: { enabled: native_multi },
        tasmota: { enabled: tasmota },
        wled: { enabled: wled },
        shelly: { enabled: shelly },
        esphome: { enabled: esphome },
        hyperion: { enabled: hyperion },
        tpkasa: { enabled: tpkasa },
        elgato: { enabled: elgato },
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

  const onSubmit_IP = () => {
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        IP_RANGE: {
          IP_RANGE_START: IP_RANGE_START,
          IP_RANGE_END: IP_RANGE_END,
          SUB_IP_RANGE_START: SUB_IP_RANGE_START,
          SUB_IP_RANGE_END: SUB_IP_RANGE_END,
        }
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

  const changeIp = (IP, type) => {
    if (type === "start") {
      setIpRangeStart(Number(IP.split(".")[3]))
      setSubIpRangeStart(Number(IP.split(".")[2]))
    } else if (type === "end") {
      setIpRangeStop(Number(IP.split(".")[3]))
      setSubIpRangeStop(Number(IP.split(".")[2]))
    }
  };

  const onSubmit_ScanOnHostIP = () => {
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        scanonhostip: ScanOnHostIP
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

  return (
    <div className="inner">
      <CardGrid options="main">
        <GlassContainer options="spacer">
          <PageContent>
            <div className="headline">Add extra port for searching</div>
            <p>This wil make the bridge search on other ports.</p>
            <p>If disabled the bridge wil only search on port 80.</p>
            <p>The standard port is 80, always include port 80.</p>
            <p>To add ports separate the ports with "," ex: 80,81,82</p>
            <form className="add-form">
              <FlipSwitch
                id="ports"
                value={port_enable}
                onChange={(e) => setPort_Enable(e)}
                checked={port_enable}
                label="Enable"
                position="right"
              />
              <div className="form-control">
                <GenericText
                  label="Port"
                  type="text"
                  placeholder="Aditional ports"
                  value={port}
                  onChange={(e) => setPort(e)}
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
            </form>
          </PageContent>
        </GlassContainer>

        <GlassContainer options="spacer">
          <PageContent>
            <div className="headline">Search IP Range Config</div>
            <p>Set IP range for light search.</p>
            <GenericText
              label={`IP Range Start (you can change ${IP.split(".")[0]}.${IP.split(".")[1]}.xxx.yyy)`}
              type="text"
              value={`${IP.split(".")[0]}.${IP.split(".")[1]}.${SUB_IP_RANGE_START}.${IP_RANGE_START}`}
              onChange={(e) => changeIp(e, "start")}
            />
            <GenericText
              label={`IP Range End (you can change ${IP.split(".")[0]}.${IP.split(".")[1]}.XXX.YYY)`}
              type="text"
              value={`${IP.split(".")[0]}.${IP.split(".")[1]}.${SUB_IP_RANGE_END}.${IP_RANGE_END}`}
              onChange={(e) => changeIp(e, "end")}
            />
            <div className="form-control">
              <GenericButton
                value="Save"
                color="blue"
                size=""
                type="submit"
                onClick={() => onSubmit_IP()}
              />
            </div>
          </PageContent>
        </GlassContainer>

        <GlassContainer options="spacer">
          <PageContent>
            <div className="headline">Search Protocol Config</div>
            <p>Set which protocol to find.</p>
            <form className="add-form">
              <FlipSwitch
                id="Yeelight"
                value={yeelight}
                onChange={(e) => setYeelight(e)}
                checked={yeelight}
                label="Yeelight"
                position="right"
              />

              <FlipSwitch
                id="Native_multi"
                value={native_multi}
                onChange={(e) => setNative_multi(e)}
                checked={native_multi}
                label="Native_multi"
                position="right"
              />

              <FlipSwitch
                id="Tasmota"
                value={tasmota}
                onChange={(e) => setTasmota(e)}
                checked={tasmota}
                label="Tasmota"
                position="right"
              />

              <FlipSwitch
                id="Wled"
                value={wled}
                onChange={(e) => setWled(e)}
                checked={wled}
                label="Wled"
                position="right"
              />

              <FlipSwitch
                id="Shelly"
                value={shelly}
                onChange={(e) => setShelly(e)}
                checked={shelly}
                label="Shelly"
                position="right"
              />

              <FlipSwitch
                id="Esphome"
                value={esphome}
                onChange={(e) => setEsphome(e)}
                checked={esphome}
                label="Esphome"
                position="right"
              />

              <FlipSwitch
                id="Hyperion"
                value={hyperion}
                onChange={(e) => setHyperion(e)}
                checked={hyperion}
                label="Hyperion"
                position="right"
              />

              <FlipSwitch
                id="Tpkasa"
                value={tpkasa}
                onChange={(e) => setTpkasa(e)}
                checked={tpkasa}
                label="Tpkasa"
                position="right"
              />

              <FlipSwitch
                id="Elgato"
                value={elgato}
                onChange={(e) => setElgato(e)}
                checked={elgato}
                label="Elgato"
                position="right"
              />
              <div className="form-control">
                <GenericButton
                  value="Save"
                  color="blue"
                  size=""
                  type="submit"
                  onClick={() => onSubmit_protocol()}
                />
              </div>
            </form>
          </PageContent>
        </GlassContainer>

        <GlassContainer options="spacer">
          <PageContent>
            <div className="headline">Search on host IP</div>
            <p>Set to search on host IP.</p>
            <form className="add-form">
              <FlipSwitch
                id="ScanOnHostIP"
                value={ScanOnHostIP}
                onChange={(e) => setScanOnHostIP(e)}
                checked={ScanOnHostIP}
                label="Enable"
                position="right"
              />
            </form>
            <div className="form-control">
              <GenericButton
                value="Save"
                color="blue"
                size=""
                type="submit"
                onClick={() => onSubmit_ScanOnHostIP()}
              />
            </div>
          </PageContent>
        </GlassContainer>
      </CardGrid>
    </div>
  );
};

export default Settings;
