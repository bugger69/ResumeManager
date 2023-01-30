import axios from 'axios';
import React, {useState} from 'react';

const Login = () => {
    const [rollNo, setRollNo] = useState();
    const [dob, setDob] = useState();
    // post to http://localhost:4000/

    const onSubmit = (e) => {
        e.preventDefault();
        const obj = {name: rollNo, password: dob };
        axios.post("http://localhost:4000/login", obj)
        .then((res) => {
            alert("Logged in!!!");
            window.location.href = "/";
        }).catch(e => {
            console.log(e);
        })
    }
    return <form onSubmit={onSubmit}>
    <p>Roll No.</p>
    <input type = "text" id = "name" onChange={(e) => setRollNo(e.target.value)} />
    <p>Date of birth</p>
    <input type = "password" id = "password" onChange={(e) => setDob(e.target.value)} />
    <button type ="submit" value = "submit">Submit</button>
</form>
}

export default Login;