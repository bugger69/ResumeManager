import React from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bulma-components";

const InternPage = () => {
  const { internId } = useParams();
  const [Data, setData] = useState({ companyID: {} });
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/intern/${internId}`, {
        withCredentials: true,
      })
      .then(function (res) {
        console.log(res.data);
        setData(res.data);
      })
      .catch(function (e) {
        console.log(e);
      });

    axios
      .get("http://localhost:4000/api/user", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [internId]);

  const obj = { msg: "application" };

  console.log(user);

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
      <Card className="mt-4 ml-2 mr-2">
        <Card.Header>
          <Card.Header.Title className="is-justify-content-space-around">
            {Data.companyID.companyName}
          </Card.Header.Title>
        </Card.Header>
        <Card.Content>
          <Card className="ml-1">
            <h1 className="has-text-weight-bold">Description:</h1>
            <p>{Data.description}</p>
          </Card>
          <Card>
            <Card.Content>
              <h1>
                <span className="has-text-weight-bold">Start Date:</span>{" "}
                {Data.start_date}
              </h1>
              <h1>
                <span className="has-text-weight-bold">Stipend:</span> Rs
                {Data.stipend}
              </h1>
              <h1>
                <span className="has-text-weight-bold">Compensation:</span>{" "}
                {Data.compensation ? Data.compensation : "None"}
              </h1>
              <h1>
                <span className="has-text-weight-bold">
                  Application Deadline:
                </span>{" "}
                {Data.application_deadline}
              </h1>
            </Card.Content>
            <Card.Content>
              <h1 className="has-text-weight-bold">Supervision(If Needed):</h1>
              <p>{Data.supervision_mentorship}</p>
              <h1 className="has-text-weight-bold">Eligibility for FE:</h1>
              <p>{Data.eligiblity_for_FE}</p>
            </Card.Content>
          </Card>
        </Card.Content>
        <Card.Footer>
          {!(user.designation === "comp_representative") ? (
            <Card.Footer.Item>
              <Button onClick={applyForIntern}>Apply</Button>
            </Card.Footer.Item>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          {user.designation === "comp_representative" ? (
            <Card.Footer.Item>
              <Button onClick={getAllInterns}>Get All applications</Button>
            </Card.Footer.Item>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};
export default InternPage;
