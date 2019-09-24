var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {
    return axios.get("http://www.nytimes.com", function(res){

    var $ = cheerio.load(res.data);
    console.log("scraping data")

    var articles = [];

    $(".assetWrapper").each(function(i, element){

        var head= $(this).find("h2").text().trim();
        var url= $(this).find("a").attr("href");
        var sum = $(this).children("p").text().trim();

        if (head && sum && url) {
            //Replace regex method to clean up white space
            var headNeat =  head.replace(/(r\n|\n|\r|t|\s+)/gm, " ").trim();
            var sumNeat = sum.replace(/(r\n|\n|\r|t|\s+)/gm, " ").trim();

            var dataToAdd = {
                title: headNeat,
                summary: sumNeat,
                url: "http://www.nytimes.com" + url
            };
            articles.push(dataToAdd);
            console.log("Articles", articles);
        }
    });
        return articles;
        
    });
};

module.exports = scrape;