import React, { useState } from "react";
import axios from "axios"
const Recruiterview = ()=> {
 
    const [CompanyName, setCompanyName] = useState();
    const [Description , setDescription] = useState();
    const [StartDate , setStartDate]  = useState();
    const [EndDate ,setEndDate] = useState()
    const [Stipend ,setStipend] = useState()
    const [Compensation ,setCompensation] = useState()
    const [ApplicationDeadline ,setApplicationDeadline] = useState()
    const [SupervisionMentorship ,setSupervisionMentorship] = useState()
    const [ HiringInformation,setHiringInformation] = useState()
    const [ Eligibility,setEligibility] = useState()
 

    const CreateIntern = (e)=>{
        e.preventDefault();
        const obj = {
            companyName : CompanyName,
            description: Description,
            startDate : StartDate,
            enddate : EndDate,
            stipend: Stipend,
            compensation:Compensation,
            applicationDeadline: ApplicationDeadline,
            supervisionMentorship:SupervisionMentorship,
            hiringInformation:HiringInformation,
            eligibility:Eligibility,
        }

        console.log("obj", obj);
            
      axios.post("http://localhost:4000/api/intern", obj , {withCredentials : true})
      .then((res) => {
        alert("yup");
       
      })
      .catch((e) => {
        console.log(e);
      });

        
   
    }
    
    return <div className="cont"><form onSubmit={CreateIntern}>
    <label htmlFor = "CompanyName">Company Name</label>
    <input type = "text" id="CompanyName" onChange={(e) => setCompanyName(e.target.value)}/>
    <label htmlFor = "Description">Description</label>
    <input type = "text" id="Description" onChange={(e) => setDescription(e.target.value)} />
    <label htmlFor = "StartDate">Start Date</label>
    <input type = "date" id="StartDate" onChange={(e) => setStartDate(e.target.value)} />
    <label for = "EndDate">End Date</label>
    <input type = "date" onChange={(e) => setEndDate(e.target.value)}/>
    <label for = "Stipend">Stipend</label>
    <input type = "number"onChange={(e) => setStipend(e.target.value)} />
    <label for = "Compensation">Compensation</label>
    <input type = "text"onChange={(e) => setCompensation(e.target.value)} />
    <label for = "ApplicationDeadline">Application Deadline</label>
    <input type = "date" onChange={(e) => setApplicationDeadline(e.target.value)}/>
    <label for = "SupervisionMentorship">Supervision Mentorship</label>
    <input type = "text" onChange={(e) => setSupervisionMentorship(e.target.value)}/>
    <label for = "HiringInformation">Hiring Information</label>
    <input type = "text" onChange={(e) => setHiringInformation(e.target.value)}/>
    <label for = "Eligibility">Eligibility</label>
    <input type = "text" onChange={(e) => setEligibility(e.target.value)}/>
    <button type = "submit" >Go</button>
    </form></div>
}
    
    


export default Recruiterview;


