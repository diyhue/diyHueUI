import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import GenericButton from "../GenericButton/GenericButton";
import GenericText from "../GenericText/GenericText";
import SelectMenu from "../SelectMenu/SelectMenu";
import BrightnessSlider from "../BrightnessSlider/BrightnessSlider";
import CustomTimePicker from "../TimePicker/Timepicker";
import dayjs from 'dayjs';

const Edit_behavior = ({ HOST_IP, API_KEY, Behavior_item, closeWizard }) => {
  const [behaviorData, setBehaviorData] = useState({
    script_id: Behavior_item["script_id"],
    Name: Behavior_item["metadata"]["name"],
    hour: Behavior_item["configuration"]["when"]["time_point"]["time"]["hour"],
    minute: Behavior_item["configuration"]["when"]["time_point"]["time"]["minute"],
    recurrence_days: Behavior_item["configuration"]["when"]["recurrence_days"],
    fade_in_duration: Behavior_item["configuration"]["fade_in_duration"]["seconds"],
    turn_lights_off_after: Behavior_item["configuration"]["turn_lights_off_after"]["seconds"],
    end_brightness: Behavior_item["configuration"]["end_brightness"],
  });

  const [initialTime, setValue] = useState(dayjs().hour(behaviorData.hour).minute(behaviorData.minute));

  const handleChange = (key, value) => {
    setBehaviorData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    console.log([key] + ": " + value);
  };

  const handleSave = () => {
    const updatedBehavior = {
      ...Behavior_item,
      metadata: { name: behaviorData.Name },
      configuration: {
        ...Behavior_item.configuration,
        when: {
          ...Behavior_item.configuration.when,
          time_point: {
            ...Behavior_item.configuration.when.time_point,
            time: {
              hour: behaviorData.hour,
              minute: behaviorData.minute,
            },
          },
          recurrence_days: behaviorData.recurrence_days,
        },
        fade_in_duration: { seconds: behaviorData.fade_in_duration },
        turn_lights_off_after: { seconds: behaviorData.turn_lights_off_after },
        end_brightness: behaviorData.end_brightness,
      },
    };

    axios
      .put(`${HOST_IP}/clip/v2/resource/behavior_instance/${Behavior_item.id}`, updatedBehavior, {
        headers: {
          "hue-application-key": API_KEY,
        },
      })
      .then((response) => {
        console.log("Behavior updated:", response.data);
        toast.success("Behavior updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
      closeWizard(true);
  };

  const days = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  return (
    <>
      <div className="form-control">
        <div className="form-control">
          <GenericText
            label="Name"
            type="text"
            placeholder="Name of Automation"
            value={behaviorData.Name}
            onChange={(e) => handleChange("Name", e)}
          />
        </div>
        <div className="form-control">
          <CustomTimePicker
            label="Time"
            value={initialTime}
            onChange={(newValue) => {
              handleChange("hour", newValue.hour());
              handleChange("minute", newValue.minute());
            }}
          />
        </div>
        <div className="form-control">
          <GenericText
            label="Fade In Duration (seconds)"
            type="number"
            placeholder="Fade In Duration"
            value={behaviorData.fade_in_duration}
            onChange={(e) => handleChange("fade_in_duration", e)}
          />
        </div>
        <div className="form-control">
          <GenericText
            label="Turn Lights Off After (seconds)"
            type="number"
            placeholder="Turn Lights Off After"
            value={behaviorData.turn_lights_off_after}
            onChange={(e) => handleChange("turn_lights_off_after", e)}
          />
        </div>
        <div className="form-control">
          <label>End Brightness</label>
          <BrightnessSlider
            defaultValue={behaviorData.end_brightness}
            max = "100"
            onChange={(value) => handleChange("end_brightness", value)}
          />
        </div>
        <div className="form-control">
          <SelectMenu
            label="Recurrence Days"
            options={days}
            value={behaviorData.recurrence_days}
            onChange={(e) => handleChange("recurrence_days", e)}
            close={false}
            multie={true}
          />
        </div>
      </div>
      <GenericButton onClick={handleSave}>Save</GenericButton>
    </>
  );
};

export default Edit_behavior;
