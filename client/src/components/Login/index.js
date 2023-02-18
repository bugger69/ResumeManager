import axios from "axios";
import React, { useState, useContext } from "react";

import Navbar from "../Navbar";
import AuthContext from "../store/auth-context";

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
        withCredentials: true
      })
      .then((res) => {
        if(res.status === 200) {
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
  return (<>
    <Navbar />
    <div className="cont">
      <form className="input" onSubmit={onSubmit}>
        <label className="label" htmlFor="username">Username:</label>
        <input
          className="input"
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="label" htmlFor="password">Password:</label>
        <input
          className="input"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit" value="submit">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default Login;
