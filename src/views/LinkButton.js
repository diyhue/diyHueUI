import axios from "axios";
import { toast } from 'react-hot-toast';

export default function LinkButton({ HOST_IP, API_KEY }) {
  //console.log(API_KEY)

  const pushLinkButton = () => {
    axios
      .put(`${HOST_IP}/api/${API_KEY}/config`, {
        linkbutton: { lastlinkbuttonpushed: (Date.now() / 1000) | 0 },
      })
      .then((fetchedData) => {
        console.log(fetchedData.data);
        toast.success("Pairing is allowed for 30 seconds");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  return (
    <div className="inner">
      <div className="contentContainer">
        <div className="headline">Link Button</div>
        <p>Push this button to accept the pairing of the requested app</p>
        <div className="linkbtn" onClick={() => pushLinkButton()}>
          Link App
        </div>
      </div>
    </div>
  );
}