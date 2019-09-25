var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {
    return axios.get("https://alistapart.com/articles").then (function(res){

    var $ = cheerio.load(res.data);
    console.log("scraping data")

    var articles = [];

    $(".site-main").each(function(i, element){

        var head= $(this).find("h2").text().trim();
        var url= $(this).find("a").attr("href");
        var sum = $(this).find(".entry-content").text().trim(); 
        console.log(url);

        if (head && sum && url) {
            //Replace regex method to clean up white space
            var headNeat =  head.replace(/(r\n|\n|\r|t|\s+)/gm, " ").trim();
            var sumNeat = sum.replace(/(r\n|\n|\r|t|\s+)/gm, " ").trim();

            var dataToAdd = {
                title: headNeat,
                summary: sumNeat,
                url: "https://alistapart.com/" + url
            };
            articles.push(dataToAdd);
            console.log("Articles", articles);
        } 
    });
        return articles;
    }); 
};

module.exports = scrape;