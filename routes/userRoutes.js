//All user routes comes here

const {
    registerUser,
    getUser,
    updateUser,
    checkUser
} = require("../controllers/userController");

const router = require("express").Router();

router.post('/user',registerUser)
router.put('/user',updateUser)
router.get('/user',getUser)
router.get('/user/check',checkUser)

module.exports = (app) => {
    app.use('/evento', router);
}
