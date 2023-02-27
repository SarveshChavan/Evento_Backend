const express = require("express");
const { createServer } = require("http");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")

dotenv.config();
// Access the port Number
port = process.env.PORT||5000;
console.log(port);

// Database url
const dataBaseString = process.env.MONGODB_URI||"mongodb+srv://evento22023:Evento22023@cluster.bxdlvdx.mongodb.net/EventoDb";
console.log(dataBaseString);

//log to check the status of app
app.use(bodyParser.json())
app.listen(port,function(){
    console.log("App Started at port "+port)
});

//log to check mongodb connection and and start the actual routing in the app
mongoose.connect(dataBaseString).then(function(){
    console.log("Connected To MongoDB");
    routes(app);
});

