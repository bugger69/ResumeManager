import React from "react";
import axios from "axios";

const Tprview = () => {
  const recievePdf = async () => {
    try {
      const tprId = null || "642bf49b7f5fa375e6ca6ea9";
      console.log(tprId);
      const response = await axios.get(
        `http://localhost:4000/api/batch/resumes/${tprId}`,
        { responseType: "blob", withCredentials: true }
      );
      const zipBlob = new Blob([response.data], { type: "application/zip" });
      const zipUrl = URL.createObjectURL(zipBlob);
      window.location.href = zipUrl;
    } catch (error) {
      console.error(error);
    }
  };
  // const ownPdf = async ()=>{
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:4000/api/batch/resumes/6429625cd57342014b476ac0",
  //       { responseType: "blob", withCredentials: true }
  //     );
  //     const zipBlob = new Blob([response.data], { type: "application/zip" });
  //     const zipUrl = URL.createObjectURL(zipBlob);
  //     window.location.href = zipUrl;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  const Updf = (e) => {
    window.location.href = "/upload";
  };
  const Udata = (e) => {
    window.location.href = "/editinfo";
  };
  return (
    <React.Fragment>
      <p>Upload Pdf</p>
      <button onClick={Updf}>Go</button>
      <p>Update Data </p>
      <button onClick={Udata}>Go</button>
      // <p>Collect your resume</p>
      // <button onClick={ownPdf}>collect</button>
      <p>Collect Resumes of your Batch</p>
      <button onClick={recievePdf}>collect</button>
    </React.Fragment>
  );
};
export default Tprview;
