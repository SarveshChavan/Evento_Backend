// Testing routes for checking the app status

const router = require("express").Router();
const { testController } = require('../controllers/testController');

router.get('', testHome);
router.get('/events', testEvent);

module.exports = (app) => {
    app.use('/evento', router);
}
