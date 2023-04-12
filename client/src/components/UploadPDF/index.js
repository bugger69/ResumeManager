import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card } from "react-bulma-components";

import Navbar from "../Navbar";

// import "./upload.css";

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
      <Navbar />
      <Card>
        <form
          className="ml-5 mr-5"
          style={{ marginTop: "6em" }}
          onSubmit={onSubmit}
        >
          <Form.Control className="is-justify-content-space-around">
            <Form.InputFile
              id="pdf-file"
              className="mb-3"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button type="submit">Upload</Button>
          </Form.Control>
        </form>
      </Card>
    </>
  );
};

export default Upload;
