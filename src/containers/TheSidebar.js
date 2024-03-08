import { MenuItem, SubMenu } from './MenuItem';
import { memo, useState } from "react";
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
import { Bridge } from "../icons/Bridge"
import { Zigbee } from "../icons/Zigbee"
import { Deconz } from "../icons/Deconz"
import { Diybridge } from "../icons/Diybridge"
import { Tradfri } from "../icons/Tradfri"
import logo from "../static/images/logo.svg";
import "../scss/sidebar.scss";

const TheSidebar = ({ showSidebar, setShowSidebar, isMobile }) => {

  const [currentElement, setCurrentElement] = useState(window.location.hash.substring(2));

  const itemClicked = (link) => {
    if (isMobile) {
      setShowSidebar(false);
    }
    setCurrentElement(link);
  }

  
  
  const menuItems = [
    { label: 'Groups', icon: <FaUser style={{ color: "#D85BCD" }} />, link: '#' },
    { label: 'Lights', icon: <FaLightbulb style={{ color: "#4DB8B4" }} />, link: '#lights' },
    { label: 'Devices', icon: <MdSettingsRemote style={{ color: "#E0E043" }} />, link: '#devices' },
    {
      label: 'DIYHue',
      icon: <Diybridge style={{ color: "#D85BCD" }} />,
      link: '#diyhue',
      subItems: [
        { label: 'Linkbutton', icon: <FaLink style={{ color: "#FCEE86" }} />, link: '#linkbutton' },
        { label: 'Alarm', icon: <FaExclamationTriangle style={{ color: "#FCEE86" }} />, link: '#alarm' },
        { label: 'Settings', icon: <FaCog style={{ color: "#FCEE86" }} />, link: '#settings' },
        { label: 'Account', icon: <FaUser style={{ color: "#FCEE86" }} />, link: '#account' },
        { label: 'About', icon: <FaInfoCircle style={{ color: "#FCEE86" }} />, link: '#about' },
      ]
    },
    {
      label: 'Addons',
      icon: <FaCog style={{ color: "#D85BCD" }} />,
      link: '#addons',
      subItems: [
        { label: 'MQTT', icon: <Zigbee style={{ color: "#FCEE86" }} />, link: '#mqtt' },
        { label: 'HA', icon: <SiHomeassistant style={{ color: "#FCEE86" }} />, link: '#ha' },
        { label: 'Tradfri', icon: <Tradfri style={{ color: "#FCEE86" }} />, link: '#tradfri' },
        { label: 'Deconz', icon: <Deconz style={{ color: "#FCEE86" }} />, link: '#deconz' },
        { label: 'Phillips', icon: <Bridge style={{ color: "#FCEE86" }} />, link: '#hue' },
      ]
    },
    
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

export default memo(TheSidebar);
