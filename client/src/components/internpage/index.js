import React from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  }, []);

  return <React.Fragment>
  <h1>description:{Data.description}</h1>
  <h1>start date:{Data.start_date}</h1>
  <h1>stipend:{Data.stipend}</h1>
  <h1>Compensation:{Data.compensation}</h1>
  <h1>Application Deadline:{Data.application_deadline}</h1>
  <h1>supervision Mentorship:{Data.supervision_mentorship}</h1>
  <h1>Eligibility:{Data.eligiblity_for_FE}</h1>

  </React.Fragment>;
};
export default InternPage;
