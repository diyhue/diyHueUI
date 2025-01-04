import { useState } from "react";

import axios from "axios";
import { RiApps2Fill } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

import IconButton from "../IconButton/IconButton";
import GlassContainer from "../GlassContainer/GlassContainer";
import Wizard from "../Wizard/Wizard";
import GenericButton from "../GenericButton/GenericButton";

import "react-confirm-alert/src/react-confirm-alert.css";

const User = ({ HOST_IP, api_key, id, user, whitelist }) => {
  const [WizardIsOpen, setWizardIsOpen] = useState(false);
  const [WizardName, setWizardName] = useState("");
  const [WizardContent, setWizardContent] = useState({});

  const deleteAlert = () => {
    if (user["name"] === "WebUi") {
      confirmAlert({
        title: "Delete User " + user["name"] + " not allowed",
        message: "This can't be done",
        buttons: [
          {
            label: "Back",
          },
        ],
      });
    } else {
      confirmAlert({
        title: "Delete User " + user["name"],
        message: "Are you sure to do this?",
        buttons: [
          {
            label: "Yes transfer",
            onClick: () => TransferOptions(),
          },
          {
            label: "No",
          },
        ],
      });
    }
  };

  const deleteUser = (new_id) => {
    axios
      .delete(`${HOST_IP}/api/${new_id}/config/whitelist/${id}`)
      .then((fetchedData) => {
        //console.log(fetchedData.data);
        toast.success("User successfully deleted");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
    closeWizard(true);
  };

  const openWizard = () => {
    setWizardIsOpen(true);
  };

  const closeWizard = (save = false) => {
    if (save) {
      setWizardIsOpen(false);
    } else {
      confirmAlert({
        title: "Confirm to close",
        message: "You have unsaved changes. Are you sure you want to close?",
        buttons: [
          {
            label: "Yes",
            onClick: () => setWizardIsOpen(false),
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    }
  };

  const TransferOptions = () => {
    setWizardName("Transfer ownership to other user.");
    setWizardContent(
      <>
        <p>Are you sure to do this?</p>
        {Object.entries(whitelist)
          .filter((new_user) => new_user[1].name !== user["name"])
          .map(([new_id, new_user]) => (
            <div key={new_id} className="form-control">
              <GenericButton
                value={new_user["name"]}
                color="blue"
                size=""
                type="submit"
                onClick={() => deleteUser(new_id)}
              />
            </div>
          ))}
      </>
    );
    openWizard();
  };

  return (
    <GlassContainer>
      <div className="top">
        <div className="row1">
          <div className="icon">
            <RiApps2Fill />
          </div>
          <div className="text">{user["name"]}</div>
        </div>
        <div className="row2">
          <ul>
            <li>Last use date: {user["last use date"].replace("T", " ")}</li>
            <li>Create date: {user["create date"].replace("T", " ")}</li>
          </ul>
          <IconButton
            iconName={MdDeleteForever}
            title="Delete"
            size="small"
            color="red"
            onClick={() => deleteAlert()}
          />
        </div>
        <Wizard
          isOpen={WizardIsOpen}
          closeWizard={() => closeWizard(false)}
          headline={WizardName}
        >
          {WizardContent}
        </Wizard>
      </div>
    </GlassContainer>
  );
};

export default User;
