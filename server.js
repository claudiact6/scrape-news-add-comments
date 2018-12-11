//Dependencies
var express = require("express");
var mongoose = require("mongoose");

var app = express();

var db = require("./models");

var PORT = 3000;

//connect to Mongo
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoNewsScraper";
mongoose.connect(MONGODB_URI);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

//Routing
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);


// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});