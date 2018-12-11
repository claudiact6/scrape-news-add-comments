var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


module.exports = function (app) {
  app.get("/scrape", function (req, res) {
    axios.get("https://www.nytimes.com/").then(function (response) {
      var $ = cheerio.load(response.data);
      $("section.css-15zaaaz h2").each(function (i, element) {
        var result = {};
        result.title = $(this).text();
        result.summary = $(this).parent().parent().children("p").text() || $(this).parent().parent().children("ul").text();
        result.url = "http://nytimes.com" + $(this).parent().parent().attr("href");
        db.Article.create(result)
          .then(function (dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      });
      //Add success message here
    });
  });
};

