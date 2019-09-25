$(document).ready(function(){
//Setting up container for articles
//Adding event listeners to dynamically generate 'Save Articles' and 'Scrape New Articles'
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);
    $(".clear").on("click", handleArticleClear);


//Run initPage to get started
// initPage();

function initPage () {
//Empty the article container and run AJAX for the unsaved articles

// $.get("/api/articles")
$.get("/api/headlines?saved=false")
.then(function(data) {
    articleContainer.empty();
//Render any articles to the page
if (data && data.length) {
    renderArticles(data);
}
else {
    renderEmpty();
}
});

}

function renderArticles(articles) {
    var articleCards = [];
//Function to handle appending HTML container our article data to the front end
    for (var i = 0; i < articles.length; i++) {
        articleCards.push(createCard(articles[i]));
    }
    articleContainer.append(articleCards);
}

function createCard(article) {
//Function to construct JQuery element containing all the formatted HTML for the bootstrap card
    var card = $("<div class='card'>");
    var cardHeader = $("<div class='card-header'>").append(
    $("<h3>"). append (
        $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
        .attr("href", article.url)
        .text(article.headline),
      $("<a class='btn btn-success save'>Save Article</a>")
    )
  );
  var cardBody = $("<div class='card-body'>").text(article.summary);

  card.append(cardHeader, cardBody);
//Attache article id to the JQuery element

card.data("_id", article._id);
//Return a constructed card JQuery element
return card;
}

function renderEmpty() {
//function renders some HTML if we do not have any article to display
var emptyAlert = $(
    [
    "<div class='alert alert-warning text-center'>",
    "<h4>Houston, we have a problem.  We could not find any new articles.</h4>",
    "</div>",
    "<div class='card'>",
    "<div class='card-header text-center'>",
    "<h3>What Would You Like To Do?</h3>",
    "</div>",
    "<div class='card-body text-center'>",
    "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
    "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
    "</div>",
    "</div>"
    ].join("")
);

//Append this data to the page
articleContainer.append(emptyAlert);
}

function handleArticleSave() {
//Function to use when user want to save an article
var articleToSave = $(this)
    .parents(".card").data();
    // Remove card from page
    $(this)
    .parents(".card")
    .remove();

articleToSave.saved = true;

$.ajax({
    method: "PUT",
    url: "/api/headlines" + articleToSave._id,
    data: articleToSave
})
.then(function(data) {
    if (data.saved) {
        initPage();
    }
});
}

function handleArticleScrape () {
    console.log("Button clicked");
    $.get("/api/fetch")
    .then(function(data) {
        initPage();
        bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
        console.log("scrape complete");
    });
}

function handleArticleClear() {
    $.get("api/clear").then(function() {
      articleContainer.empty();
      initPage();
    });
}
});
