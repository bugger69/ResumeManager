import axios from "axios";
import React, { useState } from "react";

const EditForm = () => {
  const [username, setUsername] = useState();
  //   const [password, setPassword] = useState();
  const [name, setName] = useState();
  //   const [email, setEmail] = useState();
  const [dob, setDob] = useState();
  const [paddress, setPaddress] = useState();
  const [caddress, setCaddress] = useState();
  //   const [designation, setDesignation] = useState();
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
    .get("http://localhost:4000/user/userid")
    .then((res) => {
      let data = { ...res.data };
    });
    axios
      .put("http://localhost:4000/register", obj)
      .then((res) => {
        alert("Logged in!!!");
        // window.location.href = "/";
      })
      .catch((e) => {
        console.log(e);
      });
  };
// const date_ = '2023-02-11T10:42:07.971Z'
// const date = new Date(Date.parse(date_))
// console.log(date)

  const data ={
    name: "string",
    username: "string",
    email: "string",
    dob: "date",
    padd: "string",
    cadd: "string",
    branch: "string",
    year: 0,
    course: "btech"
  }
  ;

  
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
          value={data.name}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="label" htmlFor="dob">
          Date of birth:
        </label>
        <input
          className="input"
          type="date"
          id="dob"
          value={data.dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <label className="label" htmlFor="padd">
          Permanent address:
        </label>
        <input
          className="input"
          type="text"
          id="padd"
          value={data.padd}
          onChange={(e) => setPaddress(e.target.value)}
        />
        <label className="label" htmlFor="cadd">
          Current address:
        </label>
        <input
          className="input"
          type="text"
          id="cadd"
          value={data.cadd}
          onChange={(e) => setCaddress(e.target.value)}
        />

        <label className="label" htmlFor="branch">
          Branch:
        </label>
        <input
          className="input"
          type="text"
          id="branch"
          value={data.branch}
          onChange={(e) => setBranch(e.target.value)}
        />
        <label className="label" htmlFor="year">
          Year:
        </label>
        <input
          className="input"
          type="number"
          id="year"
          value={data.year}
          onChange={(e) => setYear(e.target.value)}
        />
        <label className="label" htmlFor="course">
          Course:
        </label>
        <input
          className="text"
          type="text"
          id="course"
          value={data.course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <button className="button" type="submit" value="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditForm;
