import React, { useState } from "react";

import GenericSwitch from "../components/POC/GenericSwitch";
import HueSwitch from "../components/POC/HueSwitch";
import Wizard from "../components/Wizard/Wizard";
import { HueIcons, HUE_ICONS_MAP } from "../static/icons/hass-hue-icons";

import GradientColorpicker from "../components/ColorPicker/GradientColorpicker";

export default function Testpage({ HOST_IP, API_KEY }) {
  const [WizardIsOpen, setWizardIsOpen] = useState(false);

  const openWizard = () => {
    setWizardIsOpen(true);
  };

  const closeWizard = () => {
    setWizardIsOpen(false);
  };
  const iconTypes = Object.keys(HUE_ICONS_MAP);

  return (
    <div className="inner">

      <GradientColorpicker/>

      <GenericSwitch />
      <HueSwitch />

      <div>
        <button onClick={openWizard}>Open Wizard</button>
        <Wizard isOpen={WizardIsOpen} closeWizard={closeWizard}>
          <p>Test Text</p>
        </Wizard>
      </div>
      <div className="icon-list">
        <h3>Available Icons:</h3>
        <ul>
          {iconTypes.map((iconType) => (
            <li key={iconType}>
              {iconType}
              <div className="hueicon">
                <HueIcons type={iconType} color="#eeeeee" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
