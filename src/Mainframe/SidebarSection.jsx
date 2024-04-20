import { SubMenu } from '../components/MenuItem/MenuItem';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaLightbulb,
  FaLink,
  FaCog,
  FaSignOutAlt,
  FaInfoCircle,
  FaExclamationTriangle,
  FaUser,
} from "react-icons/fa";
import { SiHomeassistant } from "react-icons/si";
import { MdSettingsRemote } from "react-icons/md";
import { IoExtensionPuzzle } from "react-icons/io5";
import { PiUserListFill } from "react-icons/pi";
import { Bridge } from "../static/icons/Bridge"
import { Zigbee } from "../static/icons/Zigbee"
import { Deconz } from "../static/icons/Deconz"
import { Diybridge } from "../static/icons/Diybridge"
import { Tradfri } from "../static/icons/Tradfri"
import logo from "../static/images/logo.svg";

import "./sidebarSection.scss";

const SidebarSection = ({ showSidebar, setShowSidebar, isMobile }) => {

  const [currentElement, setCurrentElement] = useState(window.location.hash.substring(2));

  const itemClicked = (link) => {
    if (isMobile) {
      setShowSidebar(false);
    }
    setCurrentElement(link);
  }



  const menuItems = [
    { label: 'Groups', icon: <FaHome style={{ color: "#2BA9F0" }} />, link: '#' },
    { label: 'Lights', icon: <FaLightbulb style={{ color: "#4DB8B4" }} />, link: '#lights' },
    { label: 'Devices', icon: <MdSettingsRemote style={{ color: "#E0E043" }} />, link: '#devices' },
    { label: 'DiyHue', icon: <Diybridge style={{ color: "#D85BCD" }} />,
      subItems: [
        { label: 'Bridge', icon: <Diybridge style={{ color: "#9CD747" }} />, link: '#bridge' },
        { label: 'Linkbutton', icon: <FaLink style={{ color: "#70C877" }} />, link: '#linkbutton' },
        { label: 'App Users', icon: <PiUserListFill style={{ color: "#30cfff" }} />, link: '#users' },
        { label: 'Alarm', icon: <FaExclamationTriangle style={{ color: "#CD3D45" }} />, link: '#alarm' },
        { label: 'Settings', icon: <FaCog style={{ color: "#D85BCD" }} />, link: '#settings' },
      ]
    },
    { label: 'Addons', icon: <IoExtensionPuzzle style={{ color: "#41f222" }} />,
      subItems: [
        { label: 'MQTT', icon: <Zigbee style={{ color: "#FCEE86" }} />, link: '#mqtt' },
        { label: 'HA', icon: <SiHomeassistant style={{ color: "#0FFEFB" }} />, link: '#ha' },
        { label: 'Tradfri', icon: <Tradfri style={{ color: "#EBAB94" }} />, link: '#tradfri' },
        { label: 'Deconz', icon: <Deconz style={{ color: "#FFFEFB" }} />, link: '#deconz' },
        { label: 'Phillips', icon: <Bridge style={{ color: "#EF7B22" }} />, link: '#hue' },
      ]
    },
    { label: 'Account', icon: <FaUser style={{ color: "#00a6ff" }} />, link: '#account' },
    { label: 'About', icon: <FaInfoCircle style={{ color: "#722371" }} />, link: '#about' },
    { label: 'Logout', icon: <FaSignOutAlt style={{ color: "#7E7E7E" }} />, link: '/logout' },
  ];

  return (
    <AnimatePresence initial={false}>
      {showSidebar && (
        <motion.div className="columnLeft"
          animate={{ width: 180 }}
          initial={{ width: 0 }}
          exit={{ width: 0 }}>
          <div className="topbarLeft active">
            <div className="logo"><img src={logo} alt="diyHue Logo" /></div>
            <div className="headline">DiyHue</div>
          </div>
          <div className="sidebar">
            <SubMenu items={menuItems} currentElement={currentElement} itemClicked={itemClicked} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SidebarSection;
