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
        var recipeId = $(this).attr("data-food-id");
        console.log(favStatus);

        if (favStatus === "false") {
            $(this).removeClass("grey pulse");
            $(this).addClass("pink");
            $(this).attr("data-faved", "true");

            /////////////////////////////

            var image = $("#" + recipeId + "image").attr("src");
            var title = $("#" + recipeId + "title").text();
            var summary = $("#" + recipeId + "summary").html();
            var ingredients = $("#" + recipeId + "ingredients").html();
            var instructions = $("#" + recipeId + "instructions").html();


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

            // adds to firebase
            database.ref("/recipes").child(recipeId).set(newRecipe);
            // database.ref("/recipes").push(newRecipe);

            console.log("Recipe Added");



        } else {
            $(this).removeClass("pink");
            $(this).addClass("grey pulse");
            $(this).attr("data-faved", "false");
            // deletes from firebase
            database.ref("/recipes").child(recipeId).remove();
        };
    });

    // basic hide and show ingredients button

    $(document).on("click", ".ingredients-btn", function () {
        var foodId = $(this).attr("data-food-id");
        console.log(foodId);

        var ingredientsState = $("#" + foodId + "food-ingredients").attr("data-state");
        console.log(ingredientsState);
        if (ingredientsState === "hidden") {
            $("#" + foodId + "food-ingredients").removeClass("hide");
            $("#" + foodId + "food-ingredients").attr("data-state", "shown");
        } else {
            $("#" + foodId + "food-ingredients").addClass("hide");
            $("#" + foodId + "food-ingredients").attr("data-state", "hidden");
        };
    });

    // basic hide and show instructions button

    $(document).on("click", ".instructions-btn", function () {

        var foodId = $(this).attr("data-food-id");

        var instructionsState = $("#" + foodId + "food-instructions").attr("data-state");
        console.log(instructionsState);
        if (instructionsState === "hidden") {
            $("#" + foodId + "food-instructions").removeClass("hide");
            $("#" + foodId + "food-instructions").attr("data-state", "shown");
        } else {
            $("#" + foodId + "food-instructions").addClass("hide");
            $("#" + foodId + "food-instructions").attr("data-state", "hidden");
        };
    });


});