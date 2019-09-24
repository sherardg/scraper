var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

//Using the Schema constructor, create a new Schema object
var ArticleSchema = new Schema({
  title: {
      type: String,
      required: true,
      unique: true
  },

  summary:{
      type: String,
      required: true
  },
  
  link: {
      type: String,
  },

  image: {
      type: String
  },
  
  note: {
      type: Schema.Types.ObjectId,
      ref: "Note"
  },

  saved: {
   type: Boolean,
   default: false
  }

})

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
