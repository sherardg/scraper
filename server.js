//Require our dependency packages
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

// Require all models
// var db = require("./models");


var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

//Set up the Express Router
var routes = require("./routes");

//Require the routes file to pass the router objec
// require("./config/routes")(router);

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Have every request go through our route middleware
app.use(routes); 

//From Homework instructions:
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);
console.log("Mongoose connection is successful");

//Routes

// app.get("/all", function(req, res) {
//   db.Article.find({}), function (err, found) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.json(found);
//     }
//   }
// });


// // A GET route for scraping the echoJS website
// app.get("/scrape", function(req, res) {
//   // First, we grab the body of the html with axios
//   axios.get("https://alistapart.com/").then(function(response) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(response.data);

//     var articles = [];

//     // Now, we grab every h2 within an article tag, and do the following:
//     $(".featured-wrap").each(function(i, element) {
//       // Save an empty result object
//       var result = {};
      

//       // Add the text and href of every link, and save them as properties of the result object
//       // result.title = $(this)
//       //   .children("h2")
//       //   .text();
//       // result.summary = $(this)
//       //   .children("p")
//       //   .text();
//       // result.link = $(this)
//       //   .children("a")
//       //   .attr("href");
//       //   console.log(result);
//       var head= $(this).find("h2").text().trim();
//         var url= $(this).find("a").attr("href");
//         var sum = $(this).find(".entry-content").text().trim(); 
//         console.log(url);

//         if (head && sum && url) {
//           //Replace regex method to clean up white space
//           var headNeat =  head.replace(/(r\n|\n|\r|t|\s+)/gm, " ").trim();
//           var sumNeat = sum.replace(/(r\n|\n|\r|t|\s+)/gm, " ").trim();

//           var dataToAdd = {
//               title: headNeat,
//               summary: sumNeat,
//               url: "http://www.nytimes.com" + url
//           };
//           articles.push(dataToAdd);
//           console.log("Articles", articles);
//       } 
//   });
//       return articles;
//   }); 
// });


//       // Create a new Article using the `result` object built from scraping
//       db.Article.create(result)
//         .then(function(dbArticle) {
//           // View the added result in the console
//           console.log(dbArticle);
//         })
//         .catch(function(err) {
//           // If an error occurred, log it
//           console.log(err);
//         });
//     });

//     // Send a message to the client
//     res.send("Scrape Complete");
//   });
// });

// // Route for getting all Articles from the db
// app.get("/articles", function(req, res) {
//   // Grab every document in the Articles collection
//   db.Article.find({})
//     .then(function(dbArticle) {
//       // If we were able to successfully find Articles, send them back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });


// // Route for saving/updating an Article's associated Note
// // app.post("/articles/:id"
// app.post("/saved", function(req, res) {
//   // Create a new note and pass the req.body to the entry
//   db.Note.create(req.body)
//     .then(function(dbNote) {
//       // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//     })
//     .then(function(dbArticle) {
//       // If we were able to successfully update an Article, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });
// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
