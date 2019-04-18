$(document).ready(function(){
// Creating an array with the topics
var topics =["Titanic", "50 First Dates", "Blades of Glory", "Zohan", "Dumb and Dumber", "Project X", "Inception", "Zoolander", "Horrible Bosses", "Jumanji", "White Chicks", "Anger Management", "Forrest Gump","500 Days of Summer","Wedding Crashers"," Get Hard"];

// displayMovieInfo function re-renders the HTML to display the appropriate content

function displayGif() {

  var movie = $(this).attr("data-movie");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=DKeOmpgY87vKJ8lcH2BeXvUBssURpPEl&limit=10"; 

  //creating AJAX call for the specific movie button bieng clicked

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    $("#gifs-appear-here").empty();

    console.log(response);
    
    var results = response.data;

    for (var i =0; i < results.length; i++) {
      
      // Only taking action if the photo has an appropriate rating
       if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
         //creating a div for the gif
         var gifDiv = $("<div>");

         gifDiv.addClass("gifs");

         //Storing the result item's rating
         var rating = results[i].rating;

         //creating a paragraph tag with the result item's rating
         var p = $("<p>").text("Rating: " + rating);

         // Creating an image tag
         var movieImage = $("<img>");

         //Giving the image tag an src attribute of a property pulled off the result item
         movieImage.attr("src", results[i].images.fixed_height_still.url);
         movieImage.attr("data-still", results[i].images.fixed_height_still.url);
         movieImage.attr("data-animate", results[i].images.fixed_height.url);
         movieImage.attr("data-state", "still");
         movieImage.addClass('movieImage');

         gifDiv.append(p);
         gifDiv.append(movieImage);

         //Prepending the gifDiv to the "#gifs-appear-here" in div in the HTML
         $("#gifs-appear-here").prepend(gifDiv);
    
       }

    $(".movieImage").on("click", function(){
        var state =$(this).attr("data-state");
        console.log(state);

        if(state === "still"){
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }else{
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });
    }
  });
}

                // Function for displaying movie data
        function renderButtons(){
        
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
          $("#buttons-view").empty();
        
          // Looping through the array of topics
          for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("movie-btn btn btn-primary");
  
          // Adding a data-attribute
          a.attr("data-movie", topics[i]);
          //Providing the initial button text
          a.text(topics[i]);
          //adding the button to the buttons-view div
          $("#buttons-view").append(a);
          }      
        }

        // This function handles events where a movie button is clicked
        $("#add-movie").on("click", function(event){
          event.preventDefault();
          // This line grabs the input from the txtbox
          var movie = $("#movie-input").val().trim();

          //adding movie from the textbox to our array
          topics.push(movie);

          // Calling renderButtons which handles the prccesing of out movie array
          renderButtons();
        });

        //adding a click event listener to all elements with a class of "movie-btn"
        $(document).on("click", ".movie-btn", displayGif);

        //calling the renderButtons function to display the initial buttons
        renderButtons();
});      
      

