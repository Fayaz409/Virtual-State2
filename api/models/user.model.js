import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    avatar:{
        type:String,
        default:'https://tse2.mm.bing.net/th?id=OIP.sHlaxfIHndDgtkr35zWJqgHaEo&pid=Api&P=0&h=220'
    },

},{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User;