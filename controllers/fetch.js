//Controller for our scrape

var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
    scrapeHeadlines: function(req, res) {
        //scrape data from 6abc
        return scrape()
        .then(function(articles){
        // insert articles into db
        return db.Article.create(articles);
        }) 
        .then(function(dbHeadline) {
            console.log("dbHeadline", articles);

            if (dbHeadline.length === 0) {
                res.json({
                    message: "No new articles today.  Check back tomorrow!"
                });
            }
            else {
                // Otherwise send back a count of how many new articles we got
                res.json({
                  message: "Added " + dbHeadline.length + " new articles!"
                });         
                

            }
      
        })
        .catch(function(err) {
            // This query won't insert articles with duplicate headlines, but it will error after inserting the others
            res.json({
              message: "Scrape complete!!"
            });
        });
    }
};