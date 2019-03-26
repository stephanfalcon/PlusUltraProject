//Be able to search ingredient item, and it pull up 10 recipes from API 
// on "click" event but submit since I couldn't change type on input
$("#search-bar").on("submit", function () {
    var searchCriteria = $("#food-item").val().trim();
    search(searchCriteria);
    return false;
}); 

// variable to push searchresults to
var searchResults = [];

// a function that contains our ajax call and generates search based on users input (criteria)
function search(criteria) {
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=" + criteria; 
    $("#recipe-area").empty()
    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "cc0b6b6f3emsh013cc6fac059723p1ff573jsnc5d6e66a0737"
        }
    }).done(function (res) {
        console.log(res);
        searchResults = res.results;
        for (var i = 0; i < res.results.length; i++) {
            var recipe = res.results[i];
            $("#recipe-area").append('<a href="#!" id="' + recipe.id + '" class="listed-food-recipe collection-item">' + recipe.title + '</a>');
        } // Another on "click" event for the results list, that will then bring up image in card
        $(".listed-food-recipe").on("click", function(evt) {
            // .target digs into JSON object to go exactly where we want to go
            var id = evt.target.id;
            var foundRecipe = "";
            for (var j = 0; j < searchResults.length; j++) {
                var currentRecipe = searchResults[j];
                // using "==" instead of "===" bc currentRecipe.id is an integer and id is a string.  === is too literal
                if (id == currentRecipe.id) {
                    foundRecipe = currentRecipe;
                    break;
                }
                
            }
            
            // you can pull anything from the API here
            $("#recipe-image").attr("src", "https://spoonacular.com/recipeImages/" + foundRecipe.image);
            
            return false; 
        });      
    });
}