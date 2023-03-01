
require("dotenv")
const User = require("../models/User");
const jwt = require("jsonwebtoken")

const verification = async (req, res, next) => {
    const { path } = req;
    const { token, api_key, authorization } = req.headers;
    if (path == "/evento/register") {
        if (api_key === process.env.API_KEY) {
            next();
        } else {
            console.log("Invalid API key");
            res.status(403).send("Invalid api key");
        }
    } else if (path == "/evento/login") {
        //Check for api key
        if (api_key === process.env.API_KEY) {
            const email = authorization.split(" ")[1];
            const user = await User.findOne({ email: email });
            if (user) {
                next();
            } else {
                console.log("User not found");
                res.status(403).send("User not found");
            }
        } else {
            console.log("Invalid API key");
            res.status(403).send("Invalid api key");
        }
    } else {
        if (api_key == process.env.API_KEY && token) {
            const email = authorization.split(" ")[1];
            const user = await User.findOne({ email: email });
            console.log(user.email);
            if (user) {
                jwt.verify(token, process.env.JWT_SECRET, (err, auth) => {
                    if (err) {
                        console.log(err);
                        res.send({ result: "Invalid Token", err: err.message });
                    } else {
                        console.log(auth);
                        next();
                    }
                })
            }
            else {
                console.log("User not found");
                res.status(403).send("User not found");
            }
        } else {
            console.log("Invalid API key Or Token Not Provided");
            res.status(403).send("Invalid api key Or Token Not Provided");
        }
    }
};

module.exports = { verification };
