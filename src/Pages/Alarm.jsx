import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import FlipSwitch from "../components/FlipSwitch/FlipSwitch";
import GenericButton from "../components/GenericButton/GenericButton";
import GenericText from "../components/GenericText/GenericText";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";
import CardGrid from "../components/CardGrid/CardGrid";

const Alarm = ({ HOST_IP, API_KEY }) => {
  const [enable, setEnable] = useState(false);
  const [email, setEmail] = useState("none");

  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/alarm`)
      .then((result) => {
        setEnable(result.data["enabled"]);
        setEmail(result.data["email"]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error: ${error.message}`);
      });
  }, [HOST_IP, API_KEY]);

  const onSubmit = () => {
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        alarm: { enabled: enable, email: email },
      })
      .then((fetchedData) => {
        //console.log(fetchedData.data);
        toast.success("Successfully saved");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <div className="inner">
      <CardGrid options="main">
        <GlassContainer>
          <PageContent>
            <div className="headline">Motion notifications alarm</div>
            <form className="add-form">
              <FlipSwitch
                id="alarm"
                value={enable}
                onChange={(e) => setEnable(e)}
                checked={enable}
                label="Enable"
                position="right"
              />
              <div className="form-control">
                <GenericText
                  label="e-mail"
                  type="text"
                  placeholder="Notification email"
                  value={email}
                  onChange={(e) => setEmail(e)}
                />
              </div>
              <div className="form-control">
                <GenericButton
                  value="Save"
                  color="blue"
                  size=""
                  type="submit"
                  onClick={(e) => onSubmit(e)}
                />
              </div>
            </form>
          </PageContent>
        </GlassContainer>
      </CardGrid>
    </div>);
};

export default Alarm;
