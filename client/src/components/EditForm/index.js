import axios from "axios";
import React, { useState, useEffect } from "react";

import "./editForm.css";

const EditForm = () => {
  const [username, setUsername] = useState("");
  //   const [password, setPassword] = useState();
  // const [name, setName] = useState();
  //   const [email, setEmail] = useState();
  const [dob, setDob] = useState("");
  const [paddress, setPaddress] = useState("");
  const [caddress, setCaddress] = useState("");
  //   const [designation, setDesignation] = useState();
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    axios
    .get("http://localhost:4000/api/user",{withCredentials: true})
    .then((res) => {
      let data = { ...res.data };
      const date_ = data.date_of_birth;
      const newDate = new Date(date_);
      const finalDate = newDate.getFullYear() + '-' + (newDate.getMonth() < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1)  + '-' + (newDate.getDate() < 10 ? '0' + newDate.getDate(): newDate.getDate()); 
      console.log(data);
      setUsername(data.username);
      setDob( new Date(finalDate));
      setPaddress(data.permanent_address);
      setCaddress(data.current_address);
      setBranch(data.branch);
      setYear(data.year);
      setCourse(data.course);
    }).catch((e) => {
      console.log(e);
    });
  }, [setUsername, setDob, setPaddress, setCaddress, setBranch, setYear, setCourse]);

  const onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      // name: name,
      username: username,
      // password: password,
      // email: email,
      dob: dob,
      p_address: paddress,
      c_address: caddress,
      // designation: designation,
      branch: branch,
      year: year,
      course: course
    };
    axios
      .put("http://localhost:4000/api/user", obj, {withCredentials: true})
      .then((res) => {
        console.log(res);
        alert("User Updated!");
        window.location.href = "/";
      })
      .catch((e) => {
        console.log(e);
      });
  };
// const date_ = '2023-02-11T10:42:07.971Z';
// const newDate = new Date(date_);
// const finalDate = newDate.getFullYear() + '-' + (newDate.getMonth() < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1)  + '-' + (newDate.getDate() < 10 ? '0' + newDate.getDate(): newDate.getDate()); 
// console.log(finalDate);


// const date = new Date(Date.parse(date_))
// console.log(date)

  // const data ={
  //   name: "string",
  //   username: "string",
  //   email: "string",
  //   dob: "date",
  //   padd: "string",
  //   cadd: "string",
  //   branch: "string",
  //   year: 0,
  //   course: "btech"
  // }
  // ;

  
  return (
    <div className="cont" >
      <form className="input" onSubmit={onSubmit}>
        <label className="label" htmlFor="username">
          Username:
        </label>
        <input
          className="input"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="label" htmlFor="dob">
          Date of birth:
        </label>
        <input
          className="input"
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <label className="label" htmlFor="padd">
          Permanent address:
        </label>
        <input
          className="input"
          type="text"
          id="padd"
          value={paddress}
          onChange={(e) => setPaddress(e.target.value)}
        />
        <label className="label" htmlFor="cadd">
          Current address:
        </label>
        <input
          className="input"
          type="text"
          id="cadd"
          value={caddress}
          onChange={(e) => setCaddress(e.target.value)}
        />

        <label className="label" htmlFor="branch">
          Branch:
        </label>
        <input
          className="input"
          type="text"
          id="branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
        <label className="label" htmlFor="year">
          Year:
        </label>
        <input
          className="input"
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <label className="label" htmlFor="course">
          Course:
        </label>
        <input
          className="input"
          type="text"
          id="course"
          value={course}
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
