import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [file, setFile] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);

    axios
      .post("http://localhost:4000/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((file) => {
        console.log("worked ", file);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // post to http://localhost:4000/home
  return (
    <form onSubmit={onSubmit}>
      <p>Submit your resume pdf here ( Resume pdf should be 12 Mb or less )</p>
      <input
        type="file"
        id="pdf-file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default Home;
