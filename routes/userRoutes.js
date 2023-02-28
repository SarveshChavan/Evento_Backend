//All user routes comes here
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const {
    registerUser,
    getUser,
    updateUser,
    checkUser,
    login, all
} = require("../controllers/userController");
const bodyParser = require('body-parser');

const router = require("express").Router();


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

router.use(bodyParser.json());
router.post('/user', registerUser)
router.put('/user',verifyToken, updateUser)
router.get('/user', getUser)
router.get('/user/check', checkUser)
router.post('/login', login)
router.get('/all', verifyToken, all);

module.exports = (app) => {
    app.use('/evento', router);
}
