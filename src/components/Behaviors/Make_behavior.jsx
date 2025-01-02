import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import GenericButton from "../GenericButton/GenericButton";
import SelectMenu from "../SelectMenu/SelectMenu";

const Make_Behaviors = ({ HOST_IP, API_KEY, closeWizard }) => {
  const [behaviorData, setBehaviorData] = useState({
    script_id: "7e571ac6-f363-42e1-809a-4cbf6523ed72",
  });

  const handleChange = (key, value) => {
    setBehaviorData({
      ...behaviorData,
      [key]: value,
    });
  };

  const saveBehavior = () => {
    axios
      .post(
        `${HOST_IP}/clip/v2/resource/behavior_instance`,
        behaviorData,
        {
          headers: {
            "hue-application-key": API_KEY,
          },
        }
      )
      .then((response) => {
        console.log("Behavior saved:", response.data);
        toast.success("Behavior saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving behavior:", error);
        toast.error(`Error saving behavior: ${error.message}`);
      });
      closeWizard();
  };
  
  const protocols = [
    { value: "ff8957e3-2eb9-4699-a0c8-ad2cb3ede704", label: "Wake Up" },
    { value: "7e571ac6-f363-42e1-809a-4cbf6523ed72", label: "Go To Sleep" },
    { value: "7238c707-8693-4f19-9095-ccdc1444d228", label: "Activate Scene" },
    { value: "e73bc72d-96b1-46f8-aa57-729861f80c78", label: "Countdown Timer" },
  ];

  return (<>
      <SelectMenu
        label="Protocol:"
        defaultValue={protocols[0]}
        options={protocols}
        placeholder={"ff8957e3-2eb9-4699-a0c8-ad2cb3ede704"}
        onChange={(e) => handleChange("script_id", e)}
      />
    <div className="form-control">
      <GenericButton
        value="Add Automation"
        color="blue"
        size=""
        type="submit"
        onClick={() => saveBehavior()}
      />
    </div>
  </>);
};

export default Make_Behaviors;
