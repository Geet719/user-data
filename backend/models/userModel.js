import mongoose from "mongoose";
//create schema
const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
       type:String,
       unique:true,
       required:true 
    },
    age : {
        type:Number,
    }
}, {timestamps: true});
//create model
const user = mongoose.model('user', userSchema)
export default user;