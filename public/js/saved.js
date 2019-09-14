import { truncate } from "fs";

$(document).ready(function() {
//Get a reference to the article container div
var articleContainer = $(".article-container");
$(document).on("click", ".btn.save", handleNoteSave);
$(document).on("click", ".btn.notes", handleArticleNotes);
$(document).on("click", ".btn.delete", handleArticleDelete);
$(document).on("click", ".btn.note-delete", handleNoteDelete);
$(".clear").on("click", handleArticleClear);

function initPage() {
//Empty the article container and then run an AJAX request for saved articles
$.get("/api/articles?saved=true").then(function(data){
    articleContainer.empty();
    //If we have headline then render them to display on the page
    if (data && data.length) {
        renderArticles(data);
    } else {
        renderEmpty();
    }
});
}

function renderArticles(articles) {
//Append HTML containing the article data to the page
var articleCards = [];
for (var i = 0; i < articles.length; i++) {
    articleCards.push(createCard(articles[i]));
}
//Now we have the HTML for the articles stored in the articleCards array 
//and append to the container
articleContainer.append(articleCards);
}

function createCard(article) {
    var card = $("<div class='card'>");
    var cardHeader = $("<div class='card-header'>").append(
        $("<h3>").append(
            $("<a class='article-link' target='_blank' rel='noopener noreferrer;>")
            .attr("href", article.url)
            .text(article.headline),
            $("<a class='btn btn-danger delete'>Delete From Saved</a>"),
            $("<a class='btn btn-info notes'>Article Notes</a>")
        )
    );

var cardBody = $("<div class='card-body'>").text(article.summary);
   card.append(cardHeader, cardBody);

   card.data("_id", article._id);
   return card;
}

function renderEmpty() {
    var emptyAlert = $(
        [
            "<div class='alert alert-warning text-center'>",
            "<h4> You don't have any saved articles.</h4>",
            "</div>",
            "<div class='card'>",
            "<div class='card-header text-center'>",
            "<h3>Would You Like to Browse Available Articles?</h3>",
            "</div>",
            "<div class='card-body text-center'>",
            "<h4><a href='/'>Browse Articles</a></h4>",
            "</div>",
            "</div>"
        ].join("")
    );
        articleContainer.append(emptyAlert);
}
    function renderNotesList(data) {
    //Function to render the list of note items to the note model
    var notesToRender = [];
    var currentNote;
    if (!data.notes.length) {
        //If there are no notes, then display a mesage that there are no notes
        currentNote = $("<li class='list-group-item'>No notes for this article yet.</li>");
        notesToRender.push(currentNote);
    } else {
        //Loop through all the notes, if there are any
    for (var i = 0; i < data.notes.length; i++) {
        //Li element to contain the noteText and a delete button
        currentNote = $("<li class='list-group-item note'>")
            .text(data.notes[i].noteText)
            .append($("<button class='btn btn-danger note-delete'>X</button>"));
            //Store the note id on the delete button
            currentNote.children("button").data("_id", data.notes[i]._id);
            //Add currentNote to the notesToRender array
            notesToRender.push(currentNote);
    }
}
    //Append the notes to the note-container
    $(".note-container").append(notesToRender);
    }

    function handleNoteSave() {
    //This function fires when a user tries to save a new note for an article
    var noteData;
    var newNote = $(".bootbox-body textarea").val().trim();

    if (newNote) {
        noteData = {_articleID: $(this).data("article")._id, noteText: newNote };
        $.post("/api/notes", noteData).then(function() {
            bootbox.hideAll();
        });
    }   
  }

  function handleArticleNotes(event) {
      //This function opens the notes modal and displays our notes
      var currentArticle = $(this)
        .parents(".card")
        .data();

        $.get("/api/notes" + currentArticle._id).then(function(data){
        //Constructs the HTML to add to the modal
        var modalText = $("<div class='container text-center'>").append(
            $("<h4>").text("Notes For Article: " + currentArticle._id),
            $("<hr>"),
            $("<ul class='list-group note-container'>"),
            $("<textarea placeholder='New Note'>"),
            $("<button class='btn btn-success save'>Save Note</button>")
        );
        //Add the HTML to the note modal
        bootbox.dialog({
            message: modalText,
            closeButton: true
        });
        var noteData = {
            _id: currentArticle._id,
            notes: data || []
        };
        //Add some info about the articles and article notes to the save button
        $(".btn.save").data("article", noteData);
        
        renderNotesList(noteData);
        });
  }

  function handleArticleDelete(){
      //Function for deleting article headlines
      //Grabs the id of the article inside the delete button
    var articlToDelete = $(this)
        .parents(".card")
        .remove();

        $.ajax({
            method: "DELETE",
            url: "/api/headline/ + articleToDelete._id"
        }).then(function(data) {
            if (data.ok) {
                initPage();
            }
        });
  }

  function handleNoteDelete() {
    //This function is to delete Note
    var noteToDelete = $(this).data("_id");
    $.ajax({
        url: "/api/notes" + noteToDelete,
        method: "DELETE"
    }).then(function(){
        bootbox.hideAll();
    });
  }

    function handleArticleClear() {
        $.get("api/clear")
        .then(function() {
            articleContainer.empty();
            initPage();
        });
    }
});

