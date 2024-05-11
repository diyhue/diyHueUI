import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import GenericButton from "../components/GenericButton/GenericButton";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";

const Account = ({ HOST_IP, API_KEY }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass1, setPass1] = useState("");

  useEffect(() => {
    axios
      .get(`${HOST_IP}/api/${API_KEY}/config/users`)
      .then((result) => {
        setEmail(Object.keys(result.data)[0]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error: ${error.message}`);
      });
  }, [HOST_IP, API_KEY]);

  const onSubmit = () => {
    if (pass !== pass1) {
      console.error("Password not the same");
      toast.error("Password not the same");
    } else if (pass === "") {
      console.error("Password can not be empty");
      toast.error("Password can not be empty");
    } else if (pass === pass1) {
      axios
        .put(`${HOST_IP}/api/${API_KEY}/config`, {
          users: { [email]: { password: pass } },
        })
        .then((fetchedData) => {
          console.log(fetchedData.data);
          toast.success("Successfully saved");
        })
        .catch((error) => {
          console.error(error);
          toast.error(`Error: ${error.message}`);
        });
    }
  };

  return (
    <div className="inner">
      <GlassContainer>
        <PageContent>
          <div className="headline">Change password for {email}</div>
          <form className="add-form">
            <div className="form-control">
              <label>New Password</label>
              <input
                type="password"
                placeholder=""
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder=""
                value={pass1}
                onChange={(e) => setPass1(e.target.value)}
              />
            </div>
            <div className="form-control">
              <GenericButton
                value="Save"
                color="blue"
                size=""
                type="submit"
                onClick={() => onSubmit()}
              />
            </div>
          </form>
        </PageContent>
      </GlassContainer>
    </div>
  );
};

export default Account;
