import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  FormGroup,
  TextInput,
  TextInputGroup,
  TextInputGroupMain,
  TextInputGroupUtilities
} from "@patternfly/react-core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
  if(userName !=="" && password !==""){
    if(userName === "admin" && password === "admin"){
      localStorage.setItem("token", "admin");
      navigate("/main-page");
    }
    else{
      alert("Invalid Credentials kindly re-enter");
    }
    // axios
    //   .post("YOUR-SIGNIN-API", { userName, password })
    //   .then((response) => {
    //     localStorage.setItem("token", response.data.data.token);
    //     navigate("/main-page");
    //   })
    //   .catch((error) => {
    //     alert("Invalid Credentials kindly re-enter");
    //    console.log(error);
    //   });}
  }
  };

  return (
    <div className="signin-container">
      <Form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In to PCI Chat bot</h2>

        <FormGroup label="userName" isRequired fieldId="userName">
          <TextInput
            id="userName"
            name="userName"            
            isRequired
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          />
        </FormGroup>

        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <FormGroup label="Password" isRequired fieldId="password">
          <TextInput
            type="password"
            id="password"
            name="password"
            isRequired
            onChange={(value) => setPassword(value.target.value)}
          />
        </FormGroup>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  );
};

export default SignIn;