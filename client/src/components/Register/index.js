import axios from "axios";
import React, { useState } from "react";

import "./register.css";

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [dob, setDob] = useState();
  const [paddress, setPaddress] = useState();
  const [caddress, setCaddress] = useState();
  const [designation, setDesignation] = useState();
  const [branch, setBranch] = useState();
  const [year, setYear] = useState();
  const [course, setCourse] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name: name,
      username: username,
      password: password,
      email: email,
      dob: dob,
      p_address: paddress,
      c_address: caddress,
      designation: designation,
      branch: branch,
      year: year,
      course: course,
    };
    axios
      .post("http://localhost:4000/api/register", obj)
      .then((res) => {
        alert("Logged in!!!");
        window.location.href = "/";
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="cont">
      <form className="input" onSubmit={onSubmit}>
        <label className="label" htmlFor="username">
          Username:
        </label>
        <input
          className="input"
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="label" htmlFor="password">
          Password:
        </label>
        <input
          className="input"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="label" htmlFor="password">
          Name:
        </label>
        <input
          className="input"
          type="text"
          id="password"
          onChange={(e) => setName(e.target.value)}
        />
        <label className="label" htmlFor="password">
          Email:
        </label>
        <input
          className="input"
          type="email"
          id="password"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label" htmlFor="password">
          Date of birth:
        </label>
        <input
          className="input"
          type="date"
          id="password"
          onChange={(e) => setDob(e.target.value)}
        />
        <label className="label" htmlFor="password">
          Permanent address:
        </label>
        <input
          className="input"
          type="text"
          id="password"
          onChange={(e) => setPaddress(e.target.value)}
        />
        <label className="label" htmlFor="password">
          Current address:
        </label>
        <input
          className="input"
          type="text"
          id="password"
          onChange={(e) => setCaddress(e.target.value)}
        />
        <label className="label" htmlFor="password">
          Designation:
        </label>
        <input
          className="input"
          type="text"
          id="password"
          onChange={(e) => setDesignation(e.target.value)}
        />
        <label className="label" htmlFor="password">
          Branch:
        </label>
        <input
          className="input"
          type="text"
          id="password"
          onChange={(e) => setBranch(e.target.value)}
        />
        <label className="label" htmlFor="password">
          Year:
        </label>
        <input
          className="input"
          type="number"
          id="password"
          onChange={(e) => setYear(e.target.value)}
        />
        <label className="label" htmlFor="password">
          Course:
        </label>
        <input
          className="text"
          type="text"
          id="password"
          onChange={(e) => setCourse(e.target.value)}
        />
        <button className="button" type="submit" value="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
