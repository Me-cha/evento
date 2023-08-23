import React, { useState } from "react";
import * as Components from "./Components";
import "react-phone-input-2/lib/style.css";
import CallOtp from "./CallOtp";


const Signup = () => {
  const [signIn, toggle] = React.useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    otp: "",
  });

  const handleSubmission = () => {
    if (
      !values.firsName ||
      !values.lastName ||
      !values.email ||
      !values.mobile
    ) {
      setErrorMsg("Fill all fields");
      return;
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Head>EVENTO</Components.Head>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input
            type="text"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, firstName: event.target.value }))
            }
            placeholder="Name"
          />
          <Components.Input
            type="text"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, lastName: event.target.value }))
            }
            placeholder="Name"
          />
          <Components.Input
            type="text"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, mobile: event.target.value }))
            }
            placeholder="Mobile Number"
          />
          <Components.Input
            type="email"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Email"
          />

          <Components.Button
            onClick={handleSubmission}
            disabled={submitButtonDisabled}
          >
            Sign Up
          </Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Head>EVENTO</Components.Head>
        <Components.SignTitle>Sign In !</Components.SignTitle>

        <CallOtp />
      </Components.SignInContainer>

      <Components.OverlayContainer signinIn={signIn}>
        <Components.Overlay signinIn={signIn}>
          <Components.LeftOverlayPanel signinIn={signIn}>
            <Components.Title>New Here ?</Components.Title>
            <Components.Paragraph>
              Signup and Discover New Events and Opportunities !
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signinIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              Happy to Assist your Schedule.
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
};

export default Signup;
