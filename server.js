//Dependencies
var express = require("express");
var mongoose = require("mongoose");

var app = express();

var db = require("./models");

var PORT = process.env.PORT || 3000;

//connect to Mongo
var uri = "mongodb://user:passw0rd@ds153304.mlab.com:53304/heroku_bx4ff8tj"
var MONGODB_URI = uri || "mongodb://localhost/mongoNewsScraper";
mongoose.connect(MONGODB_URI);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

//Set up Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routing
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);


// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});