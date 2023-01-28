const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name : String,
    password : String
})
const user = mongoose.model('user' , UserSchema)
// const newUser = new user({
//     name : '20dcs001',
//     password : '25042001'
// })
// newUser.save((err)=>{
//     if(err){
//         console.log(error);
//     }else{
//         console.log('User saved succesfully');
//     }
// })

module.exports = user