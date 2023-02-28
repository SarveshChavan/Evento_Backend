
const jwt = require('jwt');
const Users = require('../models/user');


const createToken = async (req, res, next) => {
    jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '300s' }, (err, token) => {

        Users.findOneAndUpdate(email, {
            $set: { token: token },
        })
            .then((user) => {
                res.statusCode = 200;
                res.json({ message: "User logedin Successfully", token: token, user: user });
            })
            .catch((error) => { console.log(error) });
    })
}