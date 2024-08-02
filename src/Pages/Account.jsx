import { useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";

import GenericButton from "../components/GenericButton/GenericButton";
import GenericText from "../components/GenericText/GenericText";
import GlassContainer from "../components/GlassContainer/GlassContainer";
import PageContent from "../components/PageContent/PageContent";
import CardGrid from "../components/CardGrid/CardGrid";

const Account = ({ HOST_IP, API_KEY }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass1, setPass1] = useState("");
  const [strength, setStrength] = useState('');
  const [strengthColor, setStrengthColor] = useState('black');

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
          //console.log(fetchedData.data);
          toast.success("Successfully saved");
        })
        .catch((error) => {
          console.error(error);
          toast.error(`Error: ${error.message}`);
        });
    }
  };

  function evaluatePasswordStrength(password) {
    let score = 0;

    if (!password) return '';

    // Check password length
    if (password.length > 8) score += 1;
    // Contains lowercase
    if (/[a-z]/.test(password)) score += 1;
    // Contains uppercase
    if (/[A-Z]/.test(password)) score += 1;
    // Contains numbers
    if (/\d/.test(password)) score += 1;
    // Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
      case 2:
        setStrengthColor('red');
        return 'Weak';
      case 3:
        setStrengthColor('orange');
        return 'Medium';
      case 4:
      case 5:
        setStrengthColor('green');
        return 'Strong';
      default:
        return '';
    }
  }

  const handleChange = (event) => {
    setPass(event);
    setStrength(evaluatePasswordStrength(event));
  };

  return (
    <div className="inner">
      <CardGrid options="main">
        <GlassContainer>
          <PageContent>
            <div className="headline">Change password</div>
            <form className="add-form">
              <div className="form-control">
                <GenericText
                  label="User Name"
                  readOnly={true}
                  type="text"
                  value={email}
                  autoComplete="username"
                />
              </div>
              <div className="form-control">
                <GenericText
                  label="New Password"
                  type="password"
                  placeholder="Enter Password"
                  value={pass}
                  onChange={(e) => handleChange(e)}
                  autoComplete="new-password"
                />
              </div>
              <small>
                Password strength:{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    color: strengthColor,
                  }}
                >
                  {strength}
                </span>
              </small>
              <div className="form-control">
                <GenericText
                  label="Confirm Password"
                  type="password"
                  placeholder="Repeat Password"
                  value={pass1}
                  onChange={(e) => setPass1(e)}
                  autoComplete="new-password"
                />
              </div>
              {pass !== pass1 && (
                <small>
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: 'red',
                    }}
                  >
                    {"Passwords don't match"}
                  </span>
                </small>
              )}
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
      </CardGrid>
    </div>
  );
};

export default Account;
