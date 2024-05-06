import React, { useEffect, useState } from "react";
import axios from "axios";
import Group from "../components/Group/Group";
import RoomSetup from "../components/RoomSetup/RoomSetup";
import { toast } from 'react-hot-toast';
import GenericSwitch from "../components/POC/GenericSwitch";
import HueSwitch from "../components/POC/HueSwitch";
import Wizard from "../components/Wizard/Wizard";

export default function Testpage({ HOST_IP, API_KEY }) {
 
  const [WizardIsOpen, setWizardIsOpen] = useState(false);

  const openWizard = () => {
    setWizardIsOpen(true);
  };

  const closeWizard = () => {
    setWizardIsOpen(false);
  };

  return (
    <div className="inner">
      
      <GenericSwitch />
      <HueSwitch />


      <div>
      <button onClick={openWizard}>Open Wizard</button>
      <Wizard isOpen={WizardIsOpen} closeWizard={closeWizard}>
        <p>Test Text</p>
      </Wizard>
    </div>

      
    </div>
  );
}