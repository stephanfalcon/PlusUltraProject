$(document).ready(function () {

    // Initialize Firebase
    // Not needed because it is called in RecipeCardLogic


    // var config = {
    //     apiKey: "AIzaSyBP2bIcOJ5msjtfLLVspEVYsWoFt7DbK7k",
    //     authDomain: "my-food-calendar.firebaseapp.com",
    //     databaseURL: "https://my-food-calendar.firebaseio.com",
    //     projectId: "my-food-calendar",
    //     storageBucket: "my-food-calendar.appspot.com",
    //     messagingSenderId: "352501120418"
    // };
    // firebase.initializeApp(config);

    var database = firebase.database();

    favArray = [];

    database.ref("/recipes").on("child_added", function (snapshot) {

        // adds to array
        favArray.push(snapshot.key);
        console.log(favArray)


    });

    $('select').formSelect();
    //Be able to search ingredient item, and it pull up 10 recipes from API 
    // on "click" event but submit since I couldn't change type on input
    console.log("here")
    $("#search-btn").on("click", function (event) {
        event.preventDefault();
        var searchCriteria = $("#food-item").val().trim();
        var refineCriteria = $("#more-options .selected").text().trim();
        console.log(refineCriteria);
        search(searchCriteria, refineCriteria);
        return false;
    });

    // variable to push searchresults to
    var searchResults = [];

    // a function that contains our ajax call and generates search based on users input (criteria)
    function search(search, refine) {
        var queryURL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${search}&diet=${refine}`;
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

            $("#results").removeClass("hide");
            // Another on "click" event for the results list, that will then bring up image in card

        });
    }

    // $(".listed-food-recipe").on("click", function(evt) {
    $(document).on("click", ".listed-food-recipe", function (evt) {

        $(".listed-food-recipe").removeClass("active");
        $(this).addClass("active");

        infoDump(evt.target.id)
        $(".favorite-btn").attr("data-food-id", evt.target.id);
        $(".instructions-btn").attr("data-food-id", evt.target.id);
        $(".ingredients-btn").attr("data-food-id", evt.target.id);
        $(".food-instructions").attr("id", evt.target.id + "food-instructions");
        $(".food-ingredients").attr("id", evt.target.id + "food-ingredients");

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
            ///////////////////////////
            $(".food-image").attr("src", result.image);
            $(".food-image").attr("id", result.id + "image");
            $(".food-title").attr("id", result.id + "title");
            $(".food-summary").attr("id", result.id + "summary");
            $(".ingredients").attr("id", result.id + "ingredients");
            $(".instructions").attr("id", result.id + "instructions");

            // puts ingredients in a table
            if (result.extendedIngredients.length > 0) {
                for (i in result.extendedIngredients) {

                    ingred = $("<tr>")
                    ingred.append($("<td>").text(result.extendedIngredients[i].name));
                    // Math.floor(num * 100) / 100)
                    ingred.append($("<td>").text(Math.round(result.extendedIngredients[i].amount * 1000) / 1000));
                    ingred.append($("<td>").text(result.extendedIngredients[i].unit));

                    $(".ingredients").append(ingred)
                }
            } else {
                $(".ingredients").append($("<p>").text("N/A"))

            };

            // puts instructions in instruction div
            if (result.analyzedInstructions[0].steps.length > 0) {
                for (i in result.analyzedInstructions[0].steps) {
                    $(".instructions").append($("<li>").text(result.analyzedInstructions[0].steps[i].step))
                    $(".instructions").append("<br>")
                }
            } else {
                $(".instructions").append($("<p>").text("N/A"))

            };
            // $().append(list)

            if (result.diets.length > 0) {
                for (i in result.diets) {
                    $(".food-summary").append($("<p>").text(result.diets[i]))

                };
            } else {
                $(".food-summary").append($("<p>").text("N/A"))

            };

            // Changes Button style according to favorite status
            var idString = result.id.toString();
            console.log(idString);
            var index = favArray.indexOf(idString);
            if (index !== -1) {

                $(".favorite-btn").removeClass("grey pulse");
                $(".favorite-btn").addClass("pink");
                $(".favorite-btn").attr("data-faved", "true");
                console.log("Already in Favorites")

            } else {

                $(".favorite-btn").removeClass("pink");
                $(".favorite-btn").addClass("grey pulse");
                $(".favorite-btn").attr("data-faved", "false");
                console.log("Not yet in Favorites")
            }

            $("#recipe-card").removeClass("hide");


        });

    };

    $("#refine-btn").on("click", function () {
        $("#more-options").removeClass("hide");
    });

    // removes from favArray if unfavorited

    $(document).on("click", ".favorite-btn", function () {

        var favStatus = $(this).attr("data-faved");
        var recipeId = $(this).attr("data-food-id");
        console.log(favStatus);

        if (favStatus === "true") {

            console.log(favArray)
        } else {
            // removes from array
            var index = favArray.indexOf(recipeId); // <-- Not supported in <IE9
            if (index !== -1) {
                favArray.splice(index, 1);
            };
            console.log(favArray)
        };
    });












});