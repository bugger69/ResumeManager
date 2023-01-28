const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require('body-parser')
const cors = require('cors');
const user = require('./schema')

//setting up express
const app = express();
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
const port = process.env.PORT || 5000;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/ResumeManager");
  console.log("Mongo connection open");
}

app.get("/",(req,res)=>{
   res.sendFile( __dirname + '/front_end/index.html')
})
app.get("/2",(req,res)=>{
    res.sendFile(__dirname + '')
})
app.post('/' ,(req,res)=>{
    const{name,password} = req.body;
    console.log(req.body)
    user.findOne({name : name} , (err,user)=>{
        if(err){
            return res.status(500).send('Error occured while trying to login')
        }
        if(!user){
            return res.status(404).send('User not found')
        }
        if(password == user.password){
            return res.redirect('/2')
        }
        else{
            return res.status(401).send('Incorrect password')
        }
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});