const Users = require("../models/User");

//The user will be checked and if present the isUser will be true else a new user will be created
const registerUser = async (req, res) => {
    const { email, userName, password } = req.body;
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
                    securityQuestion:user.securityQuestion,
                    securityAnswer:user.securityAnswer,
                    profilePhoto: user.profilePhoto,
                    userDescription: user.userDescription
                },
                isUser:true
            });
        } else {
            if (email &&
                userName &&
                password) {
                user = await Users.create({
                    email: email,
                    userName: userName,
                    gender: " ",
                    password: password,
                    securityQuestion:" ",
                    securityAnswer:" ",
                    profilePhoto: " ",
                    userDescription: " "
                });
                if (user) {
                    return res.status(200).json({
                        message: "User created successfully",
                        user: {
                            id: user.id,
                            userName: user.userName,
                            email: user.email,
                            password: user.password,
                            gender: user.gender,
                            securityQuestion:user.securityQuestion,
                            securityAnswer:user.securityAnswer,
                            profilePhoto: user.profilePhoto,
                            userDescription: user.userDescription
                        },
                    });
                } else {
                    return res.status(400).json({
                        message: "Something went wrong",
                    });
                }
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
                    securityQuestion:user.securityQuestion,
                    securityAnswer:user.securityAnswer,
                    profilePhoto: user.profilePhoto,
                    userDescription: user.userDescription,
                },
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
                    securityQuestion:user.securityQuestion,
                    securityAnswer:user.securityAnswer,
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
module.exports = { registerUser, getUser, updateUser, checkUser };