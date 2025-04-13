import { useState, useEffect } from "react";

import axios from "axios";
import { RiApps2Fill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

import IconButton from "../IconButton/IconButton";
import GlassContainer from "../GlassContainer/GlassContainer";
import Wizard from "../Wizard/Wizard";
import GenericButton from "../GenericButton/GenericButton";
import confirmAlert from "../reactConfirmAlert/reactConfirmAlert";

const User = ({ HOST_IP, api_key, id, user, whitelist }) => {
  const [WizardIsOpen, setWizardIsOpen] = useState(false);
  const [WizardName, setWizardName] = useState("");
  const [WizardContent, setWizardContent] = useState({});
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const deleteAlert = () => {
    if (userData["name"] === "WebUi") {
      confirmAlert({
        title: "Delete User " + userData["name"] + " not allowed",
        message: "This can't be done",
        buttons: [
          {
            label: "Back",
          },
        ],
      });
    } else {
      confirmAlert({
        title: "Delete User " + userData["name"],
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
          <div className="text">{userData["name"]}</div>
        </div>
        <div className="row2">
          <ul>
            <li>Last use date: {userData["last use date"].replace("T", " ")}</li>
            <li>Create date: {userData["create date"].replace("T", " ")}</li>
          </ul>
          {userData["name"] !== "WebUi" && (
            <IconButton
              iconName={MdDeleteForever}
              title="Delete"
              size="small"
              color="red"
              onClick={() => deleteAlert()}
            />
          )}
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
