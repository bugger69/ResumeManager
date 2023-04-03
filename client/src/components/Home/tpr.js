import React from "react";

const Tprview = ()=> {
    const Updf = (e) =>{
        window.location.href = "/upload"
    }
    const Udata = (e) =>{
        window.location.href = "/editinfo"
    }
    return <div className="tpr">
    <p>Upload Pdf</p>
    <button onClick = {Updf}>Go</button>
    <p>Update Data </p>
    <button onClick = {Udata}>Go</button>
    <p>Collect Resumes of your Batch</p>
    <button>go</button>
    </div >
}
export default Tprview; 