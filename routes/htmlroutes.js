var axios = require("axios");

module.exports = function (app) {
  app.get("/", function (req, res) {
    var articlesHB;
    //CHANGE THIS URL BEFORE DEPLOYING AGAIN  
    axios.get("https://scrape-news-comment.herokuapp.com/api/articles").then(function(response) {
      articlesHB = {
        articles: response.data
      };
      res.render("index.handlebars", articlesHB);
    })
    .catch(function(error) {
      console.error(error.stack);
    });
  });
};