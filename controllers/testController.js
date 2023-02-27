// function to check the HomePage working
testHome = (req, res) => {
    res.send("This Is Home Page")
};

// function to check the EventsPage working
testEvent = (req, res) => {
    res.send("This Is Events Page")
};
module.exports = { testHome, testEvent };
