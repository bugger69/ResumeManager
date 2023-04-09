import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar";

const Allinterns = () => {
  const[data,setData] = useState([])

 useEffect(()=>{
  axios.get("http://localhost:4000/api/intern" ,{withCredentials : true}).then((res)=> {
    setData(res.data)
    console.log(data);
  }).catch((e)=>{
    console.log(e);
  })
 },[])
 const address = "http://localhost:3000/intern/";
  return <React.Fragment>
  <Navbar/>
  <div className="cont">{data.map(function(val){
    return <a href={address + val._id}>{val.description}</a>
  })}
  </div></React.Fragment>
  
};
export default Allinterns;
