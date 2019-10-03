//Controller for our headlines
//Get scrape scripts
var scrape = require("../scripts/scrape");

var db = require("../models");


module.exports = {
      // Find all headlines, sort them by date, send them back to the user
  findAll: function(req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(function(dbHeadline) {
        res.json(dbHeadline);
      });
  },
  // Delete the specified headline
  delete: function(req, res) {
    db.Article.remove({ _id: req.params.id }).then(function(dbHeadline) {
      res.json(dbHeadline);
    });
  },
  // Update the specified headline
  update: function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function(dbHeadline) {
      res.json(dbHeadline);
    });
  }
};


// var scrape = require("../scripts/scrape");

// //Bring in the Headline and Note mongoose models
// var Headline = require("../models/Headline");

// module.exports = {
//     fetch: function(cb) {
//         scrape(function(data){
//             var articles = data;
//             for (var i = 0; i < articles.length; i++) {
//                 articles[i].saved = false;
//             }

//             Headline.collection.insertMany(articles, {ordered:false}, function(err, docs){
//                 cb(err, docs);
//             });
//         });
//     },
//     delete: function(query, cb) {
//         Headline.remove(query, cb);
//     },
//     get: function(query, cb) {
//         Headline.find(query)
//         .sort({
//             _id: -1
//         })
//         .exec(function(err, doc) {
//             cb(doc);
//         });
//     },
//     update: function(query, cb) {
//         Headline.update({_id: query._id}, {
//             $set: query
//         }, {}, cb);
//     }
// }