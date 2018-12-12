var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


module.exports = function (app) {
  //CREATING ROUTES 
  //Get the headlines and save in db
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

  //Save notes in database 
  app.post("/api/notes/:articleid", function (req, res) {
    db.Note.create(req.body)
      .then(function (newNote) {
        return db.Article.find({ "_id": req.params.id }, { $push: { "notes": newNote._id } });
      })
      .then(function (modifiedArticle) {
        res.json(modifiedArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  //RETRIEVING ROUTES 
  //Get all saved articles
  app.get("/api/articles", function (req, res) {
    db.Article.find({})
      .then(function (articles) {
        res.json(articles);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  //Get one article and show comments ("notes")
  app.get("/api/articles/:articleid", function (req, res) {
    db.Article.find({ "_id": req.params.articleid })
      .populate("note")
      .then(function (populatedArticle) {
        res.json(populatedArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  //DELETING ROUTES
  //Delete a comment ("note")



};

