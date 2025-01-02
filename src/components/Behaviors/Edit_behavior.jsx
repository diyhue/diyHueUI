import { useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import GenericButton from "../GenericButton/GenericButton";
import GenericText from "../GenericText/GenericText";
import SelectMenu from "../SelectMenu/SelectMenu";

const Edit_behavior = ({ HOST_IP, API_KEY, closeWizard }) => {
  

  return (<>
    <div className="form-control">
      <GenericText
        label="Light IP Address"
        type="text"
        placeholder="192.168.x.x"
      />
    </div>
  </>);
};

export default Edit_behavior;
