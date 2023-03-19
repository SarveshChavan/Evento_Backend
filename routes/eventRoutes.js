// All event routes comes here

const {
    createEvent,
    getEventById,
    getEvents,
    updateEvent,
    endEvent,
    deleteEvent } = require("../controllers/eventController");

const router = require("express").Router();


router.post('/event', createEvent)
router.get('/event', getEventById)
router.get('/event/type', getEvents)
router.put('/event/end', endEvent)
router.put('/event', updateEvent)
router.delete('/event', deleteEvent)

module.exports = (app) => {
    app.use('/evento', router);
}
