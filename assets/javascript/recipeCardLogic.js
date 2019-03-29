$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBP2bIcOJ5msjtfLLVspEVYsWoFt7DbK7k",
        authDomain: "my-food-calendar.firebaseapp.com",
        databaseURL: "https://my-food-calendar.firebaseio.com",
        projectId: "my-food-calendar",
        storageBucket: "my-food-calendar.appspot.com",
        messagingSenderId: "352501120418"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // Basic favorite button color toggle

    $(document).on("click", ".favorite-btn", function () {

        var favStatus = $(this).attr("data-faved");
        console.log(favStatus);
        if (favStatus === "false") {
            $(this).removeClass("grey pulse");
            $(this).addClass("pink");
            $(this).attr("data-faved", "true");

            var image = $("#recipe-image").attr("src");
            var title = $(".food-title").text();
            var summary = $("#recipe-summary").text();
            var ingredients = $(".ingredients").html();
            var instructions = $(".instructions").html();
            var recipeId = $(this).attr("data-food-id");

            console.log(image);
            console.log(title);
            console.log(summary);
            console.log(ingredients);
            console.log(instructions);
            console.log(recipeId);

            var newRecipe = {
                image: image,
                title: title,
                summary: summary,
                ingredients: ingredients,
                instructions: instructions,
                recipeId: recipeId
            };

            database.ref("/recipes").push(newRecipe);

            console.log("Recipe Added");



        } else {
            $(this).removeClass("pink");
            $(this).addClass("grey pulse");
            $(this).attr("data-faved", "false");
        };
    });

    // basic hide and show ingredients button

    $(document).on("click", ".ingredients-btn", function () {

        var ingredientsState = $(".food-ingredients").attr("data-state");
        console.log(ingredientsState);
        if (ingredientsState === "hidden") {
            $(".food-ingredients").removeClass("hide");
            $(".food-ingredients").attr("data-state", "shown");
        } else {
            $(".food-ingredients").addClass("hide");
            $(".food-ingredients").attr("data-state", "hidden");
        };
    });

    // basic hide and show instructions button

    $(document).on("click", ".instructions-btn", function () {

        var instructionsState = $(".food-instructions").attr("data-state");
        console.log(instructionsState);
        if (instructionsState === "hidden") {
            $(".food-instructions").removeClass("hide");
            $(".food-instructions").attr("data-state", "shown");
        } else {
            $(".food-instructions").addClass("hide");
            $(".food-instructions").attr("data-state", "hidden");
        };
    });


});