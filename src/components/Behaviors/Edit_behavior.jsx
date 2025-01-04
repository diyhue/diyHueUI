import { useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import { toast } from "react-hot-toast";

import BrightnessSlider from "../BrightnessSlider/BrightnessSlider";
import CustomTimePicker from "../TimePicker/Timepicker";
import GenericButton from "../GenericButton/GenericButton";
import GenericText from "../GenericText/GenericText";
import SelectMenu from "../SelectMenu/SelectMenu";

const Edit_behavior = ({ HOST_IP, API_KEY, Behavior_item, closeWizard }) => {
  const initialBehaviorData = {
    script_id: Behavior_item["script_id"],
    Name: Behavior_item["metadata"]["name"],
    hour: Behavior_item["configuration"]["when"]?.["time_point"]?.["time"]?.["hour"] || 0,
    minute: Behavior_item["configuration"]["when"]?.["time_point"]?.["time"]?.["minute"] || 0,
    recurrence_days: Behavior_item["configuration"]["when"]?.["recurrence_days"] || Behavior_item["configuration"]["when_extended"]?.["recurrence_days"] || [],
    fade_in_duration: Behavior_item["configuration"]["fade_in_duration"]?.["seconds"] || 0,
    turn_lights_off_after: Behavior_item["configuration"]["turn_lights_off_after"]?.["seconds"] || 0,
    end_brightness: Behavior_item["configuration"]["end_brightness"] || 0,
    duration: Behavior_item["configuration"]["duration"]?.seconds || 0,
    where: Behavior_item["configuration"]["where"] || [],
    what: Behavior_item["configuration"]["what"] || [],
    fade_out_duration: Behavior_item["configuration"]["fade_out_duration"]?.seconds || 0,
    end_state: Behavior_item["configuration"]["end_state"] || "",
    start_at: Behavior_item["configuration"]["when_extended"]?.["start_at"]?.["time_point"]?.["type"] || "",
    end_at: Behavior_item["configuration"]["when_extended"]?.["end_at"]?.["time_point"]?.["type"] || "",
  };

  if (Behavior_item["script_id"] === "ff8957e3-2eb9-4699-a0c8-ad2cb3ede704") {
    delete initialBehaviorData.duration;
    delete initialBehaviorData.where;
    delete initialBehaviorData.what;
    delete initialBehaviorData.fade_out_duration;
    delete initialBehaviorData.end_state;
    delete initialBehaviorData.start_at;
    delete initialBehaviorData.end_at;
  } else if (Behavior_item["script_id"] === "e73bc72d-96b1-46f8-aa57-729861f80c78") {
    delete initialBehaviorData.hour;
    delete initialBehaviorData.minute;
    delete initialBehaviorData.recurrence_days;
    delete initialBehaviorData.fade_in_duration;
    delete initialBehaviorData.turn_lights_off_after;
    delete initialBehaviorData.end_brightness;
    delete initialBehaviorData.fade_out_duration;
    delete initialBehaviorData.end_state;
    delete initialBehaviorData.start_at;
    delete initialBehaviorData.end_at;
  } else if (Behavior_item["script_id"] === "7e571ac6-f363-42e1-809a-4cbf6523ed72") {
    delete initialBehaviorData.duration;
    delete initialBehaviorData.what;
    delete initialBehaviorData.fade_in_duration;
    delete initialBehaviorData.turn_lights_off_after;
    delete initialBehaviorData.end_brightness;
    delete initialBehaviorData.start_at;
    delete initialBehaviorData.end_at;
  } else if (Behavior_item["script_id"] === "7238c707-8693-4f19-9095-ccdc1444d228") {
    delete initialBehaviorData.duration;
    delete initialBehaviorData.hour;
    delete initialBehaviorData.minute;
    delete initialBehaviorData.fade_in_duration;
    delete initialBehaviorData.turn_lights_off_after;
    delete initialBehaviorData.end_brightness;
    delete initialBehaviorData.fade_out_duration;
    delete initialBehaviorData.end_state;
  }

  const [behaviorData, setBehaviorData] = useState(initialBehaviorData);

  const [initialTime, setinitialTime] = useState(dayjs().set('hour', behaviorData.hour).set('minute', behaviorData.minute));
  const [fadeInTime, setFadeInTime] = useState(dayjs().set('hour', 0).set('minute', behaviorData.fade_in_duration / 60));
  const [turnOffTime, setTurnOffTime] = useState(dayjs().set('hour', 0).set('minute', behaviorData.turn_lights_off_after / 60));
  const [durationTime, setDurationTime] = useState(dayjs().set('hour', Math.floor(behaviorData.duration / 3600)).set('minute', Math.floor((behaviorData.duration % 3600) / 60)));
  const [fadeOutTime, setFadeOutTime] = useState(dayjs().set('hour', 0).set('minute', behaviorData.fade_out_duration / 60));

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
            ...Behavior_item.configuration.when?.time_point,
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
        duration: { seconds: behaviorData.duration },
        where: behaviorData.where,
        what: behaviorData.what,
        fade_out_duration: { seconds: behaviorData.fade_out_duration },
        end_state: behaviorData.end_state,
        when_extended: {
          start_at: {
            time_point: {
              type: behaviorData.start_at,
            },
          },
          end_at: {
            time_point: {
              type: behaviorData.end_at,
            },
          },
        },
      },
    };

    if (behaviorData.script_id === "ff8957e3-2eb9-4699-a0c8-ad2cb3ede704") {
      delete updatedBehavior.configuration.duration;
      delete updatedBehavior.configuration.where;
      delete updatedBehavior.configuration.what;
      delete updatedBehavior.configuration.fade_out_duration;
      delete updatedBehavior.configuration.end_state;
      delete updatedBehavior.configuration.when_extended;
    } else if (behaviorData.script_id === "e73bc72d-96b1-46f8-aa57-729861f80c78") {
      delete updatedBehavior.configuration.when;
      delete updatedBehavior.configuration.fade_in_duration;
      delete updatedBehavior.configuration.turn_lights_off_after;
      delete updatedBehavior.configuration.end_brightness;
      delete updatedBehavior.configuration.fade_out_duration;
      delete updatedBehavior.configuration.end_state;
      delete updatedBehavior.configuration.when_extended;
    } else if (behaviorData.script_id === "7e571ac6-f363-42e1-809a-4cbf6523ed72") {
      delete updatedBehavior.configuration.duration;
      delete updatedBehavior.configuration.what;
      delete updatedBehavior.configuration.fade_in_duration;
      delete updatedBehavior.configuration.turn_lights_off_after;
      delete updatedBehavior.configuration.end_brightness;
      delete updatedBehavior.configuration.when_extended;
    } else if (behaviorData.script_id === "7238c707-8693-4f19-9095-ccdc1444d228") {
      delete updatedBehavior.configuration.duration;
      delete updatedBehavior.configuration.when;
      delete updatedBehavior.configuration.fade_in_duration;
      delete updatedBehavior.configuration.turn_lights_off_after;
      delete updatedBehavior.configuration.end_brightness;
      delete updatedBehavior.configuration.fade_out_duration;
      delete updatedBehavior.configuration.end_state;
    }

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

  const selectedDays = behaviorData.recurrence_days ? behaviorData.recurrence_days.map(day => days.find(d => d.value === day)) : [];

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
        {["ff8957e3-2eb9-4699-a0c8-ad2cb3ede704", "7e571ac6-f363-42e1-809a-4cbf6523ed72"].includes(behaviorData.script_id) && (
          <>
            <div className="form-control">
              <CustomTimePicker
                label="End Time"
                value={initialTime}
                onChange={(newValue) => {
                  handleChange("hour", newValue.hour());
                  handleChange("minute", newValue.minute());
                }}
              />
            </div>
          </>
        )}
        {behaviorData.script_id === "ff8957e3-2eb9-4699-a0c8-ad2cb3ede704" && (
          <>
            <div className="form-control">
              <CustomTimePicker
                label="Fade In Duration (time before end time)"
                value={fadeInTime}
                onChange={(newValue) => {
                  handleChange("fade_in_duration", newValue.hour() * 3600 + newValue.minute() * 60);
                  setFadeInTime(newValue);
                }}
              />
            </div>
            <div className="form-control">
              <CustomTimePicker
                label="Turn Lights Off After (time after end time)"
                value={turnOffTime}
                onChange={(newValue) => {
                  handleChange("turn_lights_off_after", newValue.hour() * 3600 + newValue.minute() * 60);
                  setTurnOffTime(newValue);
                }}
              />
            </div>
            <div className="form-control">
              <label>End Brightness (%)</label>
              <BrightnessSlider
                defaultValue={behaviorData.end_brightness}
                max="100"
                onChange={(value) => handleChange("end_brightness", value)}
              />
            </div>
          </>
        )}
        {behaviorData.script_id === "e73bc72d-96b1-46f8-aa57-729861f80c78" && (
          <>
            <div className="form-control">
              <CustomTimePicker
                label="Duration"
                value={durationTime}
                onChange={(newValue) => {
                  handleChange("duration", newValue.hour() * 3600 + newValue.minute() * 60);
                  setDurationTime(newValue);
                }}
              />
            </div>
            {/* Add additional fields for "where" and "what" as needed */}
          </>
        )}
        {behaviorData.script_id === "7e571ac6-f363-42e1-809a-4cbf6523ed72" && (
          <>
            <div className="form-control">
              <CustomTimePicker
                label="Fade Out Duration (time before end time)"
                value={fadeOutTime}
                onChange={(newValue) => {
                  handleChange("fade_out_duration", newValue.hour() * 3600 + newValue.minute() * 60);
                  setFadeOutTime(newValue);
                }}
              />
            </div>
            <div className="form-control">
              <GenericText
                label="End State"
                type="text"
                placeholder="End State"
                value={behaviorData.end_state}
                onChange={(e) => handleChange("end_state", e)}
              />
            </div>
          </>
        )}
        {behaviorData.script_id === "7238c707-8693-4f19-9095-ccdc1444d228" && (
          <>
            <div className="form-control">
              <GenericText
                label="Start At"
                type="text"
                placeholder="Start At"
                value={behaviorData.start_at}
                onChange={(e) => handleChange("start_at", e)}
              />
            </div>
            <div className="form-control">
              <GenericText
                label="End At"
                type="text"
                placeholder="End At"
                value={behaviorData.end_at}
                onChange={(e) => handleChange("end_at", e)}
              />
            </div>
          </>
        )}
        {["ff8957e3-2eb9-4699-a0c8-ad2cb3ede704", "7e571ac6-f363-42e1-809a-4cbf6523ed72", "7238c707-8693-4f19-9095-ccdc1444d228"].includes(behaviorData.script_id) && (
          <div className="form-control">
            <SelectMenu
              label="Recurrence Days"
              options={days}
              defaultValue={selectedDays}
              onChange={(e) => handleChange("recurrence_days", e)}
              close={false}
              multie={true}
              classOptions="maxWidth"
            />
          </div>
        )}
        <div className="form-control">
          <GenericButton
            value="Save"
            color="blue"
            size=""
            onClick={() => handleSave()}
          />
        </div>
      </div>
    </>
  );
};

export default Edit_behavior;
