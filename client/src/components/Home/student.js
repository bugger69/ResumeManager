import React from "react";

const Studentview = ()=> {
    const Updf = (e) =>{
        window.location.href = "/upload"
    }
    const Udata = (e) =>{
        window.location.href = "/editinfo"
    }
    return <div className="student">
    <p>Upload Pdf</p>
    <button onClick = {Updf}>Go</button>
    <p>Update Data </p>
    <button onClick = {Udata}>Go</button>
    </div>
}
export default Studentview; 