import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar";

import { Card } from "react-bulma-components";

const Allinterns = () => {
  const[data,setData] = useState([])

 useEffect(()=>{
  axios.get("http://localhost:4000/api/intern" ,{withCredentials : true}).then((res)=> {
    console.log(res.data);
    setData(res.data)
  }).catch((e)=>{
    console.log(e);
  })
 },[setData])
 const address = "http://localhost:3000/intern/";
  return <React.Fragment>
  <Navbar/>
  <div className="mt-3">{data.map(function(val){
    return<Card> <a href={address + val._id}>{val.companyID.companyName}</a></Card>
  })}
  </div></React.Fragment>
  
};
export default Allinterns;
