$('select').formSelect();
//Be able to search ingredient item, and it pull up 10 recipes from API 
// on "click" event but submit since I couldn't change type on input
console.log("here")
$("#search-btn").on("click", function () {


  $("#results").removeClass("hide");

  var searchCriteria = $("#food-item").val().trim();
  search(searchCriteria);
  return false;
});

// variable to push searchresults to
var searchResults = [];

// a function that contains our ajax call and generates search based on users input (criteria)
function search(criteria) {
  var queryURL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${criteria}`;
  $("#recipe-area").empty()
  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cc0b6b6f3emsh013cc6fac059723p1ff573jsnc5d6e66a0737"
    }
  }).done(function (res) {


    searchResults = res.results;

    for (var i = 0; i < res.results.length; i++) {
      var recipe = res.results[i];
      $("#recipe-area").append('<a href="#!" id="' + recipe.id + '" class="listed-food-recipe collection-item">' + recipe.title + '</a>');
    }

    // Another on "click" event for the results list, that will then bring up image in card

  });
}

// $(".listed-food-recipe").on("click", function(evt) {
$(document).on("click", ".listed-food-recipe", function (evt) {

  $(".listed-food-recipe").removeClass("active");
  $(this).addClass("active");
  $("#recipe-card").removeClass("hide");

  infoDump(evt.target.id)
  $(".favorite-btn").attr("data-food-id", evt.target.id)

});

function infoDump(id) {
  $(".ingredients").empty()
  $(".instructions").empty()
  $(".food-summary").empty()

  $.ajax({
    url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cc0b6b6f3emsh013cc6fac059723p1ff573jsnc5d6e66a0737"
    }
  }).then(function (result) {

    // changes title and image
    $(".food-title").text(result.title)
    $("#recipe-image").attr("src", result.image)

    // puts ingredients in a table
    for (i in result.extendedIngredients) {

      ingred = $("<tr>")
      ingred.append($("<td>").attr("style", "padding:5px 0 5px 0;").text(result.extendedIngredients[i].name))
      ingred.append($("<td>").attr("style", "padding:5px 0 5px 0;").text(result.extendedIngredients[i].amount))
      ingred.append($("<td>").attr("style", "padding:5px 0 5px 0;").text(result.extendedIngredients[i].unit))

      $(".ingredients").append(ingred)
    }

    // puts instructions in instruction div
    for (i in result.analyzedInstructions[0].steps) {
      $(".instructions").append($("<li>").text(result.analyzedInstructions[0].steps[i].step))
      $(".instructions").append("<br>")
    }
    // $().append(list)

    if (result.diets.length > 0) {
      for (i in result.diets) {
        $(".food-summary").append($("<ul>").attr("style", "padding:5px 0 5px 0;").text(result.diets[i]))

      };
    } else {
      $(".food-summary").append($("<ul>").attr("style", "padding:5px 0 5px 0;").text("N/A"))

    };
  });

};

$("#refine-btn").on("click", function () {
  $("#more-options").removeClass("hide");
});