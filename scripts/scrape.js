var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {
    return axios.get("https://6abc.com/").then (function(res){

    var $ = cheerio.load(res.data);

    var articles = [];

    $(".top-stories-expanded").each(function(i, element){

        var head= $(this).find(".headline").text().trim();
        var url= $(this).find("a").attr("href");
        var profile= $(this).find("img").attr("src");
        var sum = $(this).find(".headline-list-item").text().trim(); 

        if (head && sum && profile && url) {
            //Replace regex method to clean up white space
            var headNeat =  head.replace(/(r\n|\n|\r|t|\s+)/gm, " ").trim();
            var sumNeat = sum.replace(/(r\n|\n|\r|t|\s+)/gm, " ").trim();

            var dataToAdd = {
                title: headNeat,
                summary: sumNeat,
                profile: profile,
                url: "https://6abc.com/" + url
            };
            articles.push(dataToAdd);
        } 
    });
        return articles;
    }); 
};

module.exports = scrape;