import React from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bulma-components";

const InternPage = () => {
  const { internId } = useParams();
  const [Data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/intern/${internId}`, {
        withCredentials: true,
      })
      .then(function (res) {
        console.log(res);
        setdata(res.data);
      })
      .catch(function (e) {
        console.log(e);
      });
  }, [internId]);

  const obj = { msg: "application" };

  const applyForIntern = () => {
    axios
      .post(`http://localhost:4000/api/intern/${internId}`, obj, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        alert("applied for intern!");
      })
      .catch((e) => {
        alert("An error occured in the application");
        console.log(e);
      });
  };

  const getAllInterns = () => {
    axios
      .get(`http://localhost:4000/api/intern/applications/${internId}`, {
        responseType: "blob",
        withCredentials: true,
      })
      .then((res) => {
        const zipBlob = new Blob([res.data], { type: "application/zip" });
        const zipUrl = URL.createObjectURL(zipBlob);
        window.location.href = zipUrl;
      })
      .catch((e) => {
        console.log(e);
        alert("An error occured while fetching");
      });
  };

  return (
    <React.Fragment>
      <Navbar />
      <Card className="mt-4">
        <Card.Header>
          <Card.Header.Title>{Data.companyID.companyName}</Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <Card>
            <h1>Description:</h1>
            <p>{Data.description}</p>
          </Card>
          <Card>
            <Card.Content>
              <h1>start date: {Data.start_date}</h1>
              <h1>Stipend: Rs{Data.stipend}</h1>
              <h1>
                Compensation: {Data.compensation ? Data.compensation : "None"}
              </h1>
              <h1>Application Deadline: {Data.application_deadline}</h1>
            </Card.Content>
            <Card.Content>
              <h1>Supervision(If Needed):</h1>
              <p>{Data.supervision_mentorship}</p>
              <h1>Eligibility for FE:</h1>
              <p>{Data.eligiblity_for_FE}</p>
            </Card.Content>
          </Card>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item>
            <button onClick={applyForIntern}>Apply</button>
          </Card.Footer.Item>
          <Card.Footer.Item>
            <button onClick={getAllInterns}>Get All applications</button>
          </Card.Footer.Item>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};
export default InternPage;
