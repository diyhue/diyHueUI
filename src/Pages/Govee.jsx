import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import FlipSwitch from "../components/FlipSwitch/FlipSwitch";
import GenericButton from "../components/GenericButton/GenericButton";
import GenericText from "../components/GenericText/GenericText";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";
import CardGrid from "../components/CardGrid/CardGrid";

const Govee = ({ HOST_IP, API_KEY }) => {
  const [enable, setEnable] = useState(false);
  const [goveeAPI_KEY, setGoveeAPI_KEY] = useState("");

  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/govee`)
      .then((result) => {
        setEnable(result.data["enabled"]);
        if ("api_key" in result.data)
            setGoveeAPI_KEY(result.data["api_key"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [HOST_IP, API_KEY]);

  const onSubmit = () => {
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        govee: {
          enabled: enable,
          api_key: goveeAPI_KEY,
        },
      })
      .then((fetchedData) => {
        //console.log(fetchedData.data);
        toast.success("Successfully saved, now scan for lights");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  return (
    <div className="inner">
      <CardGrid options="main">
        <GlassContainer>
          <PageContent>
            <div className="headline">Govee config</div>
            <form className="add-form">
              <FlipSwitch
                id="govee"
                value={enable}
                onChange={(e) => setEnable(e)}
                checked={enable}
                label="Enable"
                position="right"
              />
              <div className="form-control">
                <GenericText
                  label="Govee API key"
                  type="text"
                  placeholder="API key"
                  value={goveeAPI_KEY}
                  onChange={(e) => setGoveeAPI_KEY(e)}
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
      </CardGrid>
    </div>
  );
};

export default Govee;
