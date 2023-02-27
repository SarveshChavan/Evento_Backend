const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type: mongoose.Schema.Types.String,
        required: true,
    },
    userName:{
        type: mongoose.Schema.Types.String,
        required: true,
    },
    gender:{
        type: mongoose.Schema.Types.String,
        required: true,
    }, 
    password:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    securityQuestion:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    securityAnswer:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    profilePhoto: {
        type: mongoose.Schema.Types.String,
    },
    userDescription: {
        type: mongoose.Schema.Types.String,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
