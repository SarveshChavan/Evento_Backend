//All user routes comes here
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const {verifyToken} = require('../functions/verifyToken');

dotenv.config();
const {
    registerUser,
    getUser,
    updateUser,
    checkUser,
    login, all
} = require("../controllers/userController");

const router = require("express").Router();

router.post('/user', registerUser)
router.put('/user',verifyToken, updateUser)
router.get('/user', getUser)
router.get('/user/check', checkUser)
router.post('/login', login)
router.get('/all', verifyToken, all);

module.exports = (app) => {
    app.use('/evento', router);
}
