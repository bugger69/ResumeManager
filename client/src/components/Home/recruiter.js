import React, { useState } from "react";
import axios from "axios";
const Recruiterview = () => {
  const [companyName, setCompanyName] = useState();
  const [description, setDescription] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [stipend, setStipend] = useState();
  const [compensation, setCompensation] = useState();
  const [applicationDeadline, setApplicationDeadline] = useState();
  const [supervisionMentorship, setSupervisionMentorship] = useState();
  const [hiringInformation, setHiringInformation] = useState();
  const [eligibility, setEligibility] = useState();

  const CreateIntern = (e) => {
    e.preventDefault();
    const obj = {
      companyName: companyName,
      description: description,
      startDate: startDate,
      enddate: endDate,
      stipend: stipend,
      compensation: compensation,
      applicationDeadline: applicationDeadline,
      supervisionMentorship: supervisionMentorship,
      hiringInformation: hiringInformation,
      eligibility: eligibility,
    };

    console.log("obj", obj);

    axios
      .post("http://localhost:4000/api/intern", obj, { withCredentials: true })
      .then((res) => {
        alert("yup");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="cont">
      <form onSubmit={CreateIntern}>
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label htmlFor="description">description</label>
        <input
          type="text"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label for="endDate">End Date</label>
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />
        <label for="stipend">stipend</label>
        <input type="number" onChange={(e) => setStipend(e.target.value)} />
        <label for="compensation">compensation</label>
        <input type="text" onChange={(e) => setCompensation(e.target.value)} />
        <label for="applicationDeadline">Application Deadline</label>
        <input
          type="date"
          onChange={(e) => setApplicationDeadline(e.target.value)}
        />
        <label for="supervisionMentorship">Supervision Mentorship</label>
        <input
          type="text"
          onChange={(e) => setSupervisionMentorship(e.target.value)}
        />
        <label for="hiringInformation">Hiring Information</label>
        <input
          type="text"
          onChange={(e) => setHiringInformation(e.target.value)}
        />
        <label for="eligibility">eligibility</label>
        <input type="text" onChange={(e) => setEligibility(e.target.value)} />
        <button type="submit">Post Internship</button>
      </form>
    </div>
  );
};

export default Recruiterview;
