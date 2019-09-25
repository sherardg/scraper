//Controller for our scrape

var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
    scrapeHeadlines: function(req, res) {
        //scrape data from A list Apart
        return scrape()
        .then(function(articles){
        // insert articles into db
        return db.Headline.create(articles);
        })
        .then(function(dbHeadline) {
            if (dbHeadline.length === 0) {
                res.json({
                    message: "No new articles today.  Check back tomorrow!"
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