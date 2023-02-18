import axios from "axios";
import React, { useState } from "react";
import Navbar from "../Navbar";

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
  return (<>
  <Navbar />
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
        <label className="label" htmlFor="name">
          Name:
        </label>
        <input
          className="input"
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label className="label" htmlFor="email">
          Email:
        </label>
        <input
          className="input"
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label" htmlFor="date_of_birth">
          Date of birth:
        </label>
        <input
          className="input"
          type="date"
          id="date_of_birth"
          onChange={(e) => setDob(e.target.value)}
        />
        <label className="label" htmlFor="p_address">
          Permanent address:
        </label>
        <input
          className="input"
          type="text"
          id="p_address"
          onChange={(e) => setPaddress(e.target.value)}
        />
        <label className="label" htmlFor="c_address">
          Current address:
        </label>
        <input
          className="input"
          type="text"
          id="c_address"
          onChange={(e) => setCaddress(e.target.value)}
        />
        <label className="label" htmlFor="designation">
          Designation:
        </label>
        <input
          className="input"
          type="text"
          id="designation"
          onChange={(e) => setDesignation(e.target.value)}
        />
        <label className="label" htmlFor="branch">
          Branch:
        </label>
        <input
          className="input"
          type="text"
          id="branch"
          onChange={(e) => setBranch(e.target.value)}
        />
        <label className="label" htmlFor="year">
          Year:
        </label>
        <input
          className="input"
          type="number"
          id="year"
          onChange={(e) => setYear(e.target.value)}
        />
        <label className="label" htmlFor="course">
          Course:
        </label>
        <input
          className="text"
          type="text"
          id="course"
          onChange={(e) => setCourse(e.target.value)}
        />
        <button className="button" type="submit" value="submit">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default Register;
