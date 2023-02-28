const Users = require("../models/User");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
dotenv.config();

//The user will be checked and if present the isUser will be true else a new user will be created
// @pravin Implimented Bcrypt password hashing model.
const registerUser = async (req, res) => {
    var { email, userName, password} = req.body;
    console.log(email);
    console.log(req.body);
    try {
        let user = await Users.findOne({
            email: email
        });
        if (user) {
            return res.status(200).json({
                message: "User already exists",
                user: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    gender: user.gender,
                    securityQuestion: user.securityQuestion,
                    securityAnswer: user.securityAnswer,
                    profilePhoto: user.profilePhoto,
                    userDescription: user.userDescription
                },
                isUser: true
            });
        } else {
            if (email &&
                userName &&
                password) {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({ message: err.message });
                    } else {
                        Users.create({
                            email: email,
                            userName: userName,
                            gender: " ",
                            password: hash,
                            securityQuestion: " ",
                            securityAnswer: " ",
                            profilePhoto: " ",
                            userDescription: " ",
                            token:" "
                        })
                            .then((user) => {
                                jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '86400s' }, (err, token) => {
                                    
                                    Users.findOneAndUpdate(email, {
                                        $set: { token:token },
                                    })
                                    .then((user)=>{
                                        res.statusCode = 200;
                                        res.json({ message: "User Created Successfully", token:token,user:user });
                                    })
                                    .catch((error)=>{console.log(error)});
                                });
                            })
                            .catch((err) => { res.json({ message: "User not created", err: err.message }) });
                    }
                })
            } else {
                return res.status(400).json({
                    message:
                        "Looks like you don't have an account! Please register to continue",
                });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

//using email id the user will be fetched
const getUser = async (req, res) => {
    const { email } = req.query;
    try {
        const user = await Users.findOne({
            email: email
        });
        if (user) {
            console.log(user);


            res.status(200).json({
                message: "User found",
                user: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    gender: user.gender,
                    securityQuestion: user.securityQuestion,
                    securityAnswer: user.securityAnswer,
                    profilePhoto: user.profilePhoto,
                    userDescription: user.userDescription,
                }, token
            });
        } else {
            res.status(400).json({
                message: "User not found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};

//The user information will be updated by providing email
const updateUser = async (req, res) => {
    const { email } = req.query;
    const user = req.body
    try {
        const updatedUser = await Users.findOneAndUpdate(
            { email: email },
            user
        );
        const changedUser = await Users.findOne({ email: email });
        if (updatedUser) {
            console.log(changedUser);
            res.status(200).json({
                message: "User updated successfully",
                changedUser
            });
        } else {
            res.status(400).json({
                message: "User not found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};

//The user will be checked 
const checkUser = async (req, res) => {
    const { email } = req.query;
    try {
        const user = await Users.findOne({ email: email });
        if (user) {
            res.status(200).json({
                message: "User Already Exist",
                user: {
                    id: user.id,
                    userName: user.userName,
                    email: user.email,
                    gender: user.gender,
                    securityQuestion: user.securityQuestion,
                    securityAnswer: user.securityAnswer,
                    profilePhoto: user.profilePhoto,
                    userDescription: user.userDescription,
                },
                isUser: true
            })
        } else {
            res.status(400).json({
                message: "User Not Found",
                isUser: false
            })
        }
    } catch (e) {
        res.status(500).json({
            message: "Something Went Wrong",
        })
    }

}

// userlogin
const login = async (req, res, next) => {
    const { email, password } = req.body;
    Users.findOne({ email: email })
        .then((user) => {
           
                    if (user) {
                        console.log({pass:password,userpass:user.password});
                        bcrypt.compare(password, user.password, (err, result) => {
                            console.log({ result: result });
                            if (result == true) {
                                // JWT Tokens
                                jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '20s' }, (err, token) => {
                                    
                                    Users.findOneAndUpdate(email, {
                                        $set: { token:token },
                                    })
                                    .then((user)=>{
                                        res.statusCode = 200;
                                        res.json({ message: "User logedin Successfully", token:token,user:user });
                                    })
                                    .catch((error)=>{console.log(error)});
                                });
                            } else {
                                res.statusCode = 404;
                                res.setHeader('Content-Type', 'application/json');
                                res.json({ message: "Wrong Password" });
                            }
                        })
                       
                    } else {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ message: "User not found" });
                    }
             
                
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        })
}

// 
const all = async (req, res, next) => {

    Users.find({})
        .then((users) => {
            res.status(200).json({ users: users });
        })
        .catch((err) => { res.json({ message: err.message }) });
}

module.exports = { registerUser, getUser, updateUser, checkUser, login, all };