import React from "react";
import { Card, Button } from "react-bulma-components";

const Studentview = () => {
  const Updf = (e) => {
    window.location.href = "/upload";
  };
  const Udata = (e) => {
    window.location.href = "/editinfo";
  };
  return (
    <div className="student">
      <Card className="mb-5 mr-5 ml-5 has-text-centered">
        <Card.Header className="has-text-centered">
            <Card.Header.Title className="has-text-centered" style={{textAlign: "center", justifyContent: "space-around"}}>Want to upload your resume?</Card.Header.Title>
        </Card.Header>
        <Card.Content>
            <Button onClick={Updf}>Upload Pdf</Button>
        </Card.Content>
        
      </Card>
      <Card className="mr-5 ml-5 has-text-centered">
        <Card.Header className="has-text-centered">
            <Card.Header.Title className="has-text-centered" style={{textAlign: "center", justifyContent: "space-around"}}>Or if you want to update your info?</Card.Header.Title>
        </Card.Header>
        <Card.Content>
            <Button onClick={Udata}>Update Data</Button>
        </Card.Content>
      </Card>
    </div>
  );
};
export default Studentview;
