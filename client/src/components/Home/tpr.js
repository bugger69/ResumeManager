import React from "react";
import axios from "axios";
import { Card, Button } from "react-bulma-components";

const Tprview = () => {
  const recievePdf = async () => {
    try {
      const batchData = await axios.get(`http://localhost:4000/api/batch`,{withCredentials : true});
      console.log(batchData);
      const batchId = batchData.data.batchId ;
      console.log(batchId);
      const response = await axios.get(
        `http://localhost:4000/api/batch/resumes/${batchId}`,
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
      <Card className="mt-5 mb-5 mr-5 ml-5 has-text-centered">
        <Card.Header className="has-text-centered">
            <Card.Header.Title className="has-text-centered" style={{textAlign: "center", justifyContent: "space-around"}}>Want to upload your resume?</Card.Header.Title>
        </Card.Header>
        <Card.Content>
            <Button onClick={Updf}>Upload Pdf</Button>
        </Card.Content>
        
      </Card>
      <Card className="mr-5 ml-5 mb-5 has-text-centered">
        <Card.Header className="has-text-centered">
            <Card.Header.Title className="has-text-centered" style={{textAlign: "center", justifyContent: "space-around"}}>Or if you want to update your info?</Card.Header.Title>
        </Card.Header>
        <Card.Content>
            <Button onClick={Udata}>Update Data</Button>
        </Card.Content>
      </Card>

      <Card className="mr-5 ml-5 has-text-centered">
        <Card.Header className="has-text-centered">
            <Card.Header.Title className="has-text-centered" style={{textAlign: "center", justifyContent: "space-around"}}>Collect Resumes of your Batch?</Card.Header.Title>
        </Card.Header>
        <Card.Content>
            <Button onClick={Udata}>Collect</Button>
        </Card.Content>
      </Card>
      
    </React.Fragment>
  );
};
export default Tprview;






// <p>Collect your resume</p>
      // <button onClick={ownPdf}>collect</button>
