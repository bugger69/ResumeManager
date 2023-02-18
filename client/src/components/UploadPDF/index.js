import React, { useState } from "react";
import axios from "axios";

import Navbar from "../Navbar";

import "./upload.css";

const Upload = () => {
  const [file, setFile] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);

    axios
      .post("http://localhost:4000/api/upload/resume", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((file) => {
        console.log("worked ", file);
        alert("Uploaded!");
        window.location.href = "/";
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // post to http://localhost:4000/home
  return (
    <>
      <div className="">
      <Navbar />
      </div>

      <form className="container float-right d-inline-block" style={{marginTop: "6em"}}  onSubmit={onSubmit}>
        <input
          type="file"
          id="pdf-file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
    </>
  );
};

export default Upload;
