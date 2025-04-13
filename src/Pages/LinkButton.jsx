import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import QRCode from "react-qr-code";

dayjs.extend(utc);
dayjs.extend(timezone);

import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";
import GenericButton from "../components/GenericButton/GenericButton";
import CardGrid from "../components/CardGrid/CardGrid";

export default function LinkButton({ HOST_IP, API_KEY }) {
  //console.log(API_KEY)

  const [configTimezone, setConfigTimezone] = useState("");
  const [BridgeId, setBridgeId] = useState("");
  const clientTimezone = dayjs.tz.guess();
  
  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config`)
      .then((response) => {
        const { timezone, bridgeid } = response.data;
        setBridgeId(bridgeid);
        setConfigTimezone(timezone);
      })
      .catch((error) => {
        console.error("Error fetching config: ", error);
      });
  }, [HOST_IP, API_KEY]);

  const pushLinkButton = () => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config`)
      .then((result) => {
        axios
          .put(`${HOST_IP}/api/${API_KEY}/config`, {
            linkbutton: { lastlinkbuttonpushed: ((new Date(result.data["localtime"]).getTime() / 1000).toFixed(0)) | 0 },
          })
          .then((fetchedData) => {
            //console.log(fetchedData.data);
            toast.success("Pairing is allowed for 30 seconds");
          })
          .catch((error) => {
            console.error(error);
            toast.error(`Error occurred: ${error.message}`);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="inner">
      <CardGrid options="main">
      {configTimezone !== clientTimezone && (
        <GlassContainer options="red spacer">
          <PageContent>
            <div className="headline" style={{ color: "red" }}>
              Caution!
            </div>
            <p>Check<Link to="/bridge">TimeZone</Link> before pressing Link Button</p>
            <br />
            <p style={{ fontSize: ".8rem" }}>Timezone in config: {configTimezone} </p>
            <p style={{ fontSize: ".8rem" }} >Your Timezone: {clientTimezone}</p>
            
          </PageContent>
         </GlassContainer>
        )}
        <GlassContainer options="spacer">
          <PageContent>
            <div className="headline">Connection QR-Code</div>
            <p>Scan this QR-Code with the Hue app</p>
            <br />
            <QRCode
              value={`HUE:I:${BridgeId}`}
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox={`0 0 256 256`}
              bgColor="none"
              fgColor="#ffffff"
            />
          </PageContent>
        </GlassContainer>
        <GlassContainer options="spacer">
          <PageContent>
            <div className="headline">Link Button</div>
            <p>Push this button to accept the pairing of the requested app</p>
            <div className="form-control">
              <GenericButton
                value="Link App"
                color="blue"
                size=""
                onClick={() => pushLinkButton()}
              />
            </div>
          </PageContent>
        </GlassContainer>
      </CardGrid>
    </div>
  );
}
