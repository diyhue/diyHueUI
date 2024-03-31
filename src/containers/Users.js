import { MdDeleteForever } from "react-icons/md";
import { RiApps2Fill } from "react-icons/ri";

import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from 'react-hot-toast';

const Users = ({ HOST_IP, api_key, id, user }) => {
    const deleteAlert = () => {
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
      <div className="devicecard device">
        <div className="row1">
          <div className="icon">
            <RiApps2Fill />
          </div>
          <div className="text">{user["name"]}</div>
        </div>
        <div className="row2">
          <div className="text">
            Last use date: {user["last use date"]} <br />
            Create date: {user["create date"]} <br />
          </div>
        </div>
        <div className="row3">
          <div className="iconbtn red">
            <MdDeleteForever title="Delete" onClick={() => deleteAlert()} />
          </div>
        </div>
      </div>
    );
  };
  
  export default Users;