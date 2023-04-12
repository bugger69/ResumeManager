import React, { useState } from "react";
import axios from "axios";
import {Form} from "react-bulma-components" ;
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
      <Form.Field>
        <Form.Label htmlFor="companyName">Company Name</Form.Label>
        <Form.Control className="mt-2">
        <Form.Input
          type="text"
          id="companyName"
          onChange={(e) => setCompanyName(e.target.value)}
        />
        </Form.Control>
        </Form.Field>
        <Form.Field>
        <Form.Label htmlFor="description">description</Form.Label>
        <Form.Control className="mt-2">
        <Form.Input
          type="text"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        </Form.Control>
        </Form.Field>
        <Form.Field>
        <Form.Label htmlFor="startDate">Start Date</Form.Label>
        <Form.Control className="mt-2">
        <Form.Input
          type="date"
          id="startDate"
          onChange={(e) => setStartDate(e.target.value)}
        />
        </Form.Control>
        </Form.Field>
        <Form.Field>
        <Form.Label for="endDate">End Date</Form.Label>
        <Form.Control className="mt-2">
        <Form.Input type="date" onChange={(e) => setEndDate(e.target.value)} />
        </Form.Control>
        </Form.Field>
        <Form.Field>
        <Form.Label for="stipend">stipend</Form.Label>
        <Form.Control className="mt-2">
        <Form.Input type="number" onChange={(e) => setStipend(e.target.value)} />
        </Form.Control>
        </Form.Field>
        <Form.Field>
        <Form.Label for="compensation">compensation</Form.Label>
        <Form.Control className="mt-2">
        <Form.Input type="text" onChange={(e) => setCompensation(e.target.value)} />
        </Form.Control>
        </Form.Field>
        <Form.Field>
        <Form.Label for="applicationDeadline">Application Deadline</Form.Label>
        <Form.Control className="mt-2">
        <Form.Input
          type="date"
          onChange={(e) => setApplicationDeadline(e.target.value)}
        />
        </Form.Control>
        </Form.Field>
        <Form.Field>
        <Form.Label for="supervisionMentorship">Supervision Mentorship</Form.Label>
        <Form.Control className="mt-2">
        <Form.Input
          type="text"
          onChange={(e) => setSupervisionMentorship(e.target.value)}
        />
        </Form.Control>
        </Form.Field>
        <Form.Field>
        <Form.Label for="hiringInformation">Hiring Information</Form.Label>
        <Form.Control className="mt-2">
        <Form.Input
          type="text"
          onChange={(e) => setHiringInformation(e.target.value)}
        />
        </Form.Control>
        </Form.Field>
        <Form.Field>
        <Form.Label for="eligibility">eligibility</Form.Label>
        <Form.Control className="mt-2">
        <Form.Input type="text" onChange={(e) => setEligibility(e.target.value)} />
        </Form.Control>
        </Form.Field>
        <button type="submit">Post Internship</button>
      </form>
    </div>
  );
};

export default Recruiterview;
