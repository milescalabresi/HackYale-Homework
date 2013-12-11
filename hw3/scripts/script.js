/* Script for my Splash page (index.html) */


var monthInWords = {1:'January', 2:'February', 3:'March', 4:'April', 5:'May', 6:'June',
                    7:'July', 8:'August', 9:'September', 10:'October', 11:'Novovember', 12:'December'}
var today = new Date();

var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

today = dd + " " + monthInWords[mm] + " " + yyyy;



// Using window.onload as given
$(document).ready(function() {
   /* Assignment: add inputs and a button to the 'blog' section of your wireframe
   so that when you type stuff into the inputs and press that button, a new blog post appears on the page */
   $("#submit_post").click(function() {
      var post = $("#post_input").val();
      var author = $("#post_author").val();
      var title = $("#post_title").val();
      console.log("'", post, "'");
      if (post === "" || author === "" || title === "") {
      	alert("You need a title, author, and content!");
      }
      else {
	      $(".input").val("");
	      $("#blog").append("<p font-size='18px'><h2>" + title + "</h2></p>");
	      $("#blog").append("<p>Posted on: " + today + "&emsp; Posted by: " + author + "</p>");
	      $("#blog").append("<p>"+post+"</p><hr>");
	  }
   });
});