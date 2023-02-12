import axios from "axios";
import React, { useState } from "react";

import "./login.css";

const Login = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    const obj = { username: username, password: password };
    
    axios
      .post("http://localhost:4000/api/login", obj, {
        withCredentials: true
      })
      .then((res) => {
        if(res.status === 200) {
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
  );
};

export default Login;
