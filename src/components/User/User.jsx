import axios from "axios";
import { RiApps2Fill } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert"; 
import { toast } from "react-hot-toast";

import IconButton from "../IconButton/IconButton";
import GlassContainer from "../GlassContainer/GlassContainer";

import "react-confirm-alert/src/react-confirm-alert.css"; 
import "./user.scss";

const User = ({ HOST_IP, api_key, id, user }) => {
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
            label: "Yes",
            onClick: () => deleteUser(),
          },
          {
            label: "No",
          },
        ],
      });
    }
  };

  const deleteUser = () => {
    axios
      .delete(`${HOST_IP}/api/${api_key}/config/whitelist/${id}`)
      .then((fetchedData) => {
        //console.log(fetchedData.data);
        toast.success("User successfully deleted");
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error occurred: ${error.message}`);
      });
  };

  return (
    <GlassContainer>
      <div className="user">
        <div className="row1">
          <div className="icon">
            <RiApps2Fill />
          </div>
          <div className="text">{user["name"]}</div>
        </div>
        <div className="row2">
          <div className="text">
            Last use date: {user["last use date"].replace("T", " ")} <br />
            Create date: {user["create date"].replace("T", " ")} <br />
          </div>
        </div>
        <div className="row3">
          <IconButton
            iconName="MdDeleteForever"
            title="Delete"
            color="red"
            onClick={() => deleteAlert()}
          />
        </div>
      </div>
    </GlassContainer>
  );
};

export default User;
