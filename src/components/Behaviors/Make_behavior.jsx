import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import GenericButton from "../GenericButton/GenericButton";
import SelectMenu from "../SelectMenu/SelectMenu";
import GenericText from "../GenericText/GenericText";

const Make_Behaviors = ({ HOST_IP, API_KEY, closeWizard }) => {
  const [behaviorData, setBehaviorData] = useState({
    script_id: "ff8957e3-2eb9-4699-a0c8-ad2cb3ede704",
  });

  const handleChange = (key, value) => {
    if (key === "script_id") {
      setBehaviorData({
        ...behaviorData,
        [key]: value,
        Name: getTypeLabel(value),
      });
    } else {
      setBehaviorData({
        ...behaviorData,
        [key]: value,
      });
    }
    console.log([key] + ": " + value);
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
      closeWizard(true);
  };
  
  const types = [
    { value: "ff8957e3-2eb9-4699-a0c8-ad2cb3ede704", label: "Wake Up" },
    { value: "7e571ac6-f363-42e1-809a-4cbf6523ed72", label: "Go To Sleep" },
    { value: "7238c707-8693-4f19-9095-ccdc1444d228", label: "Activate Scene" },
    { value: "e73bc72d-96b1-46f8-aa57-729861f80c78", label: "Countdown Timer" },
  ];

  const days = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const getTypeLabel = (script_id) => {
    const type = types.find((type) => type.value === script_id);
    return type ? type.label : "";
  };

  return (<>
    <div className="form-control">
      <SelectMenu
        label="Protocol:"
        defaultValue={types[0]}
        options={types}
        placeholder={"Wake Up"}
        onChange={(e) => handleChange("script_id", e)}
      />
    </div>
    <div className="form-control">
      <GenericText
        label="Name"
        type="text"
        placeholder="Name of Automation"
        value={!behaviorData.Name ? getTypeLabel(behaviorData.script_id) : behaviorData.Name}
        onChange={(e) => handleChange("Name", e)}
      />
    </div>
    <div className="form-control">
      <SelectMenu
        close={false}
        multie={true}
        label="Recurrence Days:"
        defaultValue={days[0]}
        options={days}
        placeholder={"Monday"}
        onChange={(e) => handleChange("recurrence_days", e)}
      />
    </div>
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
