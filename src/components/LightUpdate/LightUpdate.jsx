import { MdSystemUpdate } from "react-icons/md";
import { toast } from "react-hot-toast";

import IconButton from "../IconButton/IconButton";
import confirmAlert from "../reactConfirmAlert/reactConfirmAlert";

const LightUpdate = ({ light, lightsCatalog }) => {
  const updateAlert = () => {
    confirmAlert({
      title: "Update light " + light["name"] + " firmware?",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => UpdateLight(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const UpdateLight = () => {
    toast.success("Begin light firmware update");
  };

  return (
    <>
      {["native_single", "native_multi"].includes(light["protocol"]) &&
        lightsCatalog.lenght > 2 &&
        light["protocol_cfg"]["version"] ===
        lightsCatalog[light["protocol_cfg"]["type"]]["version"] && (
          <IconButton
            iconName={MdSystemUpdate}
            size="small"
            color="blue"
            title="Update available"
            onClick={() => updateAlert()}
          />
        )}
    </>
  );
};

export default LightUpdate;
