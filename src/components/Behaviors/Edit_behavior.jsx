import { useState, useEffect } from "react"; // Add useEffect
import axios from "axios";
import dayjs from 'dayjs';
import { toast } from "react-hot-toast";
import FlipSwitch from "../FlipSwitch/FlipSwitch"; // Add this import

import BrightnessSlider from "../BrightnessSlider/BrightnessSlider";
import CustomTimePicker from "../TimePicker/Timepicker";
import GenericButton from "../GenericButton/GenericButton";
import GenericText from "../GenericText/GenericText";
import SelectMenu from "../SelectMenu/SelectMenu";

const Edit_behavior = ({ HOST_IP, API_KEY, Behavior_item, rooms, closeWizard }) => {
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
    start_at: Behavior_item["configuration"]["when_extended"]?.["start_at"]?.["time_point"] || { type: "" },
    end_at: Behavior_item["configuration"]["when_extended"]?.["end_at"]?.["time_point"] || { type: "" },
  };

  if (Behavior_item["script_id"] === "ff8957e3-2eb9-4699-a0c8-ad2cb3ede704") {
    delete initialBehaviorData.duration;
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
  const [turnLightsOffAfterEnabled, setTurnLightsOffAfterEnabled] = useState(!!Behavior_item["configuration"]["turn_lights_off_after"]); // Add this state

  const [initialTime, setinitialTime] = useState(dayjs().set('hour', behaviorData.hour).set('minute', behaviorData.minute));
  const [fadeInTime, setFadeInTime] = useState(dayjs().set('hour', 0).set('minute', behaviorData.fade_in_duration / 60));
  const [turnOffTime, setTurnOffTime] = useState(dayjs().set('hour', 0).set('minute', behaviorData.turn_lights_off_after / 60));
  const [durationTime, setDurationTime] = useState(dayjs().set('hour', Math.floor(behaviorData.duration / 3600)).set('minute', Math.floor((behaviorData.duration % 3600) / 60)));
  const [fadeOutTime, setFadeOutTime] = useState(dayjs().set('hour', 0).set('minute', behaviorData.fade_out_duration / 60));

  const startEndOptions = [
    { value: "time", label: "Time" },
    { value: "sunrise", label: "Sunrise" },
    { value: "sunset", label: "Sunset" },
  ];

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
            time_point: behaviorData.start_at,
          },
          end_at: {
            time_point: behaviorData.end_at,
          },
          recurrence_days: behaviorData.recurrence_days,
        },
      },
    };

    delete updatedBehavior.dependees;
    delete updatedBehavior.last_error;
    delete updatedBehavior.enabled;
    delete updatedBehavior.script_id;
    delete updatedBehavior.status;
    delete updatedBehavior.type;
    delete updatedBehavior.id;

    if (behaviorData.script_id === "ff8957e3-2eb9-4699-a0c8-ad2cb3ede704") {
      delete updatedBehavior.configuration.duration;
      delete updatedBehavior.configuration.what;
      delete updatedBehavior.configuration.fade_out_duration;
      delete updatedBehavior.configuration.end_state;
      delete updatedBehavior.configuration.when_extended;
      if (!turnLightsOffAfterEnabled) {
        delete updatedBehavior.configuration.turn_lights_off_after;
      }
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
  const selectedRooms = behaviorData.where ? behaviorData.where.map(w => rooms.find(r => r.value === w.group.rid)) : [];
  //console.log("Selected Rooms:", selectedRooms);
  //console.log("rooms:", rooms);

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
                label="Set Time"
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
                label="Fade In Duration (time before Set Time)"
                value={fadeInTime}
                onChange={(newValue) => {
                  handleChange("fade_in_duration", newValue.hour() * 3600 + newValue.minute() * 60);
                  setFadeInTime(newValue);
                }}
              />
            </div>
            <div className="form-control">
              <FlipSwitch
                id="turnLightsOffAfterSwitch"
                value={turnLightsOffAfterEnabled}
                checked={turnLightsOffAfterEnabled}
                onChange={setTurnLightsOffAfterEnabled}
                label="Enable Turn Lights Off After"
                position="right"
              />
            </div>
            {turnLightsOffAfterEnabled && (
              <div className="form-control">
                <CustomTimePicker
                  label="Turn Lights Off After (time after Set Time)"
                  value={turnOffTime}
                  onChange={(newValue) => {
                    handleChange("turn_lights_off_after", newValue.hour() * 3600 + newValue.minute() * 60);
                    setTurnOffTime(newValue);
                  }}
                />
              </div>
            )}
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
        {["e73bc72d-96b1-46f8-aa57-729861f80c78", "7e571ac6-f363-42e1-809a-4cbf6523ed72", "7238c707-8693-4f19-9095-ccdc1444d228"].includes(behaviorData.script_id) && (
          <>
            {behaviorData.script_id === "e73bc72d-96b1-46f8-aa57-729861f80c78" && (
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
            )}
            {behaviorData.script_id === "7e571ac6-f363-42e1-809a-4cbf6523ed72" && (
              <div className="form-control">
                <CustomTimePicker
                  label="Fade Out Duration (time after Set Time)"
                  value={fadeOutTime}
                  onChange={(newValue) => {
                    handleChange("fade_out_duration", newValue.hour() * 3600 + newValue.minute() * 60);
                    setFadeOutTime(newValue);
                  }}
                />
              </div>
            )}
            {behaviorData.script_id === "7238c707-8693-4f19-9095-ccdc1444d228" && (
              <>
                <div className="form-control">
                  <SelectMenu
                    label="Start At"
                    options={startEndOptions}
                    defaultValue={startEndOptions.find(option => option.value === behaviorData.start_at.type)}
                    onChange={(e) => handleChange("start_at", { type: e.value })}
                    close={true}
                    multie={false}
                    classOptions="maxWidth"
                  />
                </div>
                {behaviorData.start_at.type === "time" && (
                  <div className="form-control">
                    <CustomTimePicker
                      label="Start Time"
                      value={dayjs().set('hour', behaviorData.start_at.time?.hour || 0).set('minute', behaviorData.start_at.time?.minute || 0)}
                      onChange={(newValue) => {
                        handleChange("start_at", {
                          ...behaviorData.start_at,
                          time: {
                            hour: newValue.hour(),
                            minute: newValue.minute(),
                          },
                        });
                      }}
                    />
                  </div>
                )}
                <div className="form-control">
                  <SelectMenu
                    label="End At"
                    options={startEndOptions}
                    defaultValue={startEndOptions.find(option => option.value === behaviorData.end_at.type)}
                    onChange={(e) => handleChange("end_at", { type: e.value })}
                    close={true}
                    multie={false}
                    classOptions="maxWidth"
                  />
                </div>
                {behaviorData.end_at.type === "time" && (
                  <div className="form-control">
                    <CustomTimePicker
                      label="End Time"
                      value={dayjs().set('hour', behaviorData.end_at.time?.hour || 0).set('minute', behaviorData.end_at.time?.minute || 0)}
                      onChange={(newValue) => {
                        handleChange("end_at", {
                          ...behaviorData.end_at,
                          time: {
                            hour: newValue.hour(),
                            minute: newValue.minute(),
                          },
                        });
                      }}
                    />
                  </div>
                )}
              </>
            )}
            {/* Add additional fields for "what" as needed */}
          </>
        )}
        {["ff8957e3-2eb9-4699-a0c8-ad2cb3ede704", "7e571ac6-f363-42e1-809a-4cbf6523ed72", "7238c707-8693-4f19-9095-ccdc1444d228"].includes(behaviorData.script_id) && (
          <div className="form-control">
            <SelectMenu
              label="Recurrence Days"
              options={days}
              defaultValue={selectedDays}
              onChange={(e) => handleChange("recurrence_days", e ? e.map(day => day.value) : [])}
              close={false}
              multie={true}
              classOptions="maxWidth"
            />
          </div>
        )}
        <div className="form-control">
          <SelectMenu
            label="Where"
            options={rooms}
            defaultValue={selectedRooms}
            onChange={(e) => handleChange("where", e ? e.map(option => ({ group: { rtype: "room", rid: option.value } })) : [])}
            close={false}
            multie={true}
            classOptions="maxWidth"
          />
        </div>
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
