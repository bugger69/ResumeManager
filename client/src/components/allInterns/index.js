import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar";

const Allinterns = () => {
  const[data,setData] =useState()

 useEffect(()=>{
  axios.get("http://localhost:4000/api/intern" ,{withCredentials : true}).then((res)=> {
    console.log(res);
    setData(res.data)
  }).catch((e)=>{
    console.log(e);
  })
 },[])
  return <React.Fragment></React.Fragment>
  
};
export default Allinterns;
