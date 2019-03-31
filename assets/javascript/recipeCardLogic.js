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
    console.log(database.key)
    // Basic favorite button color toggle

    $(document).on("click", ".favorite-btn", function () {

        var favStatus = $(this).attr("data-faved");
        // console.log(favStatus);
        if (favStatus === "false") {
            $(this).removeClass("grey pulse");
            $(this).addClass("pink");
            $(this).attr("data-faved", "true");

            var image = $("#recipe-image").attr("src");
            var title = $(".food-title").text();
            var summary = $(".food-summary").html();
            var ingredients = $(".ingredients").html();
            var instructions = $(".instructions").html();
            var recipeId = $(this).attr("data-food-id");

            // console.log(image);
            // console.log(title);
            // console.log(summary);
            // console.log(ingredients);
            // console.log(instructions);
            // console.log(recipeId);

            var newRecipe = {
                image: image,
                title: title,
                summary: summary,
                ingredients: ingredients,
                instructions: instructions,
                recipeId: recipeId
            };

            database.ref("/recipes").push(newRecipe).then((snap)=>{
                console.log(snap)
            });

            // console.log("Recipe Added");



        } else {
            $(this).removeClass("pink");
            $(this).addClass("grey pulse");
            $(this).attr("data-faved", "false");
            
            // database.ref("/recipes").child()
        };
    });

    // basic hide and show ingredients button

    $(document).on("click", ".ingredients-btn", function () {
        var foodId = $(this).attr("data-food-id");

        var ingredientsState = $("#" + foodId + "ingredients").attr("data-state");
        // console.log(ingredientsState);
        if (ingredientsState === "hidden") {
            $("#" + foodId + "ingredients").removeClass("hide");
            $("#" + foodId + "ingredients").attr("data-state", "shown");
        } else {
            $("#" + foodId + "ingredients").addClass("hide");
            $("#" + foodId + "ingredients").attr("data-state", "hidden");
        };
    });

    // basic hide and show instructions button

    $(document).on("click", ".instructions-btn", function () {

        var foodId = $(this).attr("data-food-id");

        var instructionsState = $("#" + foodId + "instructions").attr("data-state");
        // console.log(instructionsState);
        if (instructionsState === "hidden") {
            $("#" + foodId + "instructions").removeClass("hide");
            $("#" + foodId + "instructions").attr("data-state", "shown");
        } else {
            $("#" + foodId + "instructions").addClass("hide");
            $("#" + foodId + "instructions").attr("data-state", "hidden");
        };
    });


});