$(document).ready(function () {

    var queryURL =
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random"

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "cc0b6b6f3emsh013cc6fac059723p1ff573jsnc5d6e66a0737"
        }
    }).done(function (response) {
        console.log(response);
        var trivia = $("#randomFoodTrivia").text(response.text);
    });

});