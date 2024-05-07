import React, { useState } from "react";

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
