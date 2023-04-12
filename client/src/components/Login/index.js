import axios from "axios";
import React, { useState, useContext } from "react";

import Navbar from "../Navbar";
import AuthContext from "../store/auth-context";
import { Form, Button, Icon } from "react-bulma-components";

import "./login.css";

const Login = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const authCtx = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    const obj = { username: username, password: password };

    axios
      .post("http://localhost:4000/api/login", obj, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          authCtx.onLogin();
          alert("Logged in!!!");
          window.location.href = "/";
        }
      })
      .catch((e) => {
        alert("error");
        console.log(e);
      });
  };
  return (
    <>
      <Navbar />
      <div className="cont">
        <form onSubmit={onSubmit} className="ml-2 mt-2 mr-2">
          <Form.Field>
            <Form.Label>Username:</Form.Label>
            <Form.Control className="mt-2">
              <Form.Input
                color="success"
                value={username}
                onChange={(e) => {
                  return setUsername(e.target.value);
                }}
              />
              {/* <Icon align="left" size="small">
                <i className="fas fa-user" />
              </Icon>
              <Icon align="right" size="small">
                <i className="fas fa-check" />
              </Icon> */}
            </Form.Control>
            {/* <Form.Help color="success">This username is available</Form.Help> */}
          </Form.Field>

          <Form.Field >
            <Form.Label>Password:</Form.Label>
            <Form.Control className="mt-2">
              <Form.Input
                type="password"
                color="primary"
                value={password}
                onChange={(e) => {
                  return setPassword(e.target.value);
                }}
              />
              {/* <Icon align="left" size="small">
                <i className="fas fa-envelope" />
              </Icon>
              <Icon align="right" size="small">
                <i className="fas fa-exclamation-triangle" />
              </Icon> */}
            </Form.Control>
          </Form.Field>

          {/* <Form.Label>Username:</Form.Label>
          <Form.Input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Label>Password:</Form.Label>
          <Form.Input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <Form.Field>
          <Button backgroundColor="link" type="submit" value="submit" className="mb-2">
            Submit
          </Button>
          </Form.Field>
        </form>
      </div>
    </>
  );
};

export default Login;
