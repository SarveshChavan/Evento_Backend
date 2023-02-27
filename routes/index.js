// All routes will access the app through this file

const eventRoutes = require("./eventRoutes");
const testRoutes = require("./testRoutes");
const userRoutes = require("./userRoutes");

const routes = (app) => {
    testRoutes(app)
    eventRoutes(app)
    userRoutes(app)
}

module.exports = routes