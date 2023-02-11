import axios from "axios";
import React, { useState } from "react";
import Studentview from "./student";
import Tprview from "./tpr";
import Recruiterview from "./recruiter";


const Home= (props)=>{
    axios
    .get("http://localhost:4000/")
    .then((res) => {
      alert("fuck you");
      console.log(res);
    //   window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
    });
    return <React.Fragment>
    {props.designation === 'Student' && <Studentview/>}
    {props.designation === 'Tpr' && <Tprview/>}
    {props.designation === 'Recruiter' && <Recruiterview/>}
    </React.Fragment>
}
export default Home;