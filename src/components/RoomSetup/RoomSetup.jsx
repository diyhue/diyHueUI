import { FaApple } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";

import "./roomSetup.scss";

function RoomSetup() {
  return (
    <div className="roomsetup">
      <p>
        There are no rooms or zones created yet. Use Hue Essentials or Hue app
        to set up this bridge.
      </p>
      <div className="storebutton">
        <img
          src="https://is4-ssl.mzstatic.com/image/thumb/Purple122/v4/13/34/4f/13344f80-706e-257c-c72b-e9d698a33bc5/AppIcon-1x_U007emarketing-0-7-0-85-220.png/246x0w.webp"
          alt="Hue Essential App"
        ></img>
        <p>Hue Essentials</p>
        <a href="https://apps.apple.com/com/app/hue-essentials/id1462943921">
          <FaApple />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.superthomaslab.hueessentials">
          <IoLogoAndroid />
        </a>
      </div>
      <div className="storebutton">
        <img
          src="https://is3-ssl.mzstatic.com/image/thumb/Purple112/v4/a8/30/a2/a830a22d-e50b-d1d7-0824-457beac55874/AppIcon-1x_U007emarketing-0-7-0-85-220.png/246x0w.webp"
          alt="Phillips Hue App"
        ></img>
        <p>Phillips Hue</p>
        <a href="https://apps.apple.com/us/app/philips-hue/id1055281310">
          <FaApple />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.philips.lighting.hue2">
          <IoLogoAndroid />
        </a>
      </div>
    </div>
  );
}

export default RoomSetup;
