//All user routes comes here
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        // req.token = token;
        console.log(token);
        jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {

            if (err) {
                console.log(authData);
                res.send({ result: "Invalid Token", err: err.message });
            } else {
                req.authData = authData;
                console.log(authData);
                next();
            }
        });
    } else {
        res.send({
            result: 'Token is not valid !!'
        });
    }
}


module.exports = {verifyToken};
