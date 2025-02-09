import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    //github info
    github:{
        id: String,
        username: String,
        email: String,
        avatar: String
    },

    //profile info
    profile:{
        bio:String,
        displayName:String,
        skills:[String],
        location:String
    },
    //account management
    account:{
        isActive:Boolean
    }

    //Authentication
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export {User}