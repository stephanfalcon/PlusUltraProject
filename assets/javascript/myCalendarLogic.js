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

    var showRecipes = false;
    var recipeId = "";
    var recipeImg = "";
    var recipeTitle = "";
    var boxId = "";

    var mealArray = ["b-sun", "b-mon", "b-tue", "b-wed", "b-thu", "b-fri", "b-sat", "l-sun", "l-mon", "l-tue", "l-wed", "l-thu", "l-fri", "l-sat", "d-sun", "d-mon", "d-tue", "d-wed", "d-thu", "d-fri", "d-sat"];

    $("#recipe-area").html("");

    // Event listener to add recipes to recipe list
    database.ref("/recipes").on("child_added", function (snapshot) {

        var foodImage = snapshot.val().image;
        var foodTitle = snapshot.val().title;
        var foodSummary = snapshot.val().summary;
        var foodIngredients = snapshot.val().ingredients;
        var foodInstructions = snapshot.val().instructions;
        var foodId = snapshot.val().recipeId;

        console.log("------")
        console.log("printing object");

        var newRecipe = $("<a>");
        newRecipe.addClass("listed-food-recipe collection-item");
        newRecipe.attr("href", "#!");
        newRecipe.attr("data-food-id", foodId);
        newRecipe.attr("data-food-img", foodImage);
        newRecipe.attr("data-food-sum", foodSummary);
        newRecipe.attr("data-food-ing", foodIngredients);
        newRecipe.attr("data-food-instr", foodInstructions);
        newRecipe.text(foodTitle);

        $("#recipe-area").append(newRecipe);


        console.log("------")
    });

    // Allows you to view favoite meals and add them to calendar
    $("#searchFavs").on("click", function () {

        if (showRecipes === false) {
            console.log("woohoo");
            $("#recipe-list").removeClass("hide");
            $(".box").removeClass("modal-trigger");
            showRecipes = true;
            $(this).text("Close")
        } else {
            console.log("weehoo");
            $("#recipe-list").addClass("hide");
            $(".listed-food-recipe").removeClass("active");
            addModalTriggers();

            showRecipes = false;
            $(this).text("Edit Meal Plan")

            recipeId = "";
            recipeImg = "";
            recipeTitle = "";
        }
    });

    function addModalTriggers() {

        $("div[data-filled='true']").addClass("modal-trigger");

    }

    $(document).on("click", ".listed-food-recipe", function () {
        recipeId = $(this).attr("data-food-id");
        recipeImg = $(this).attr("data-food-img");
        recipeSum = $(this).attr("data-food-sum");
        recipeIng = $(this).attr("data-food-ing");
        recipeInstr = $(this).attr("data-food-instr");
        recipeTitle = $(this).text();

        $(".listed-food-recipe").removeClass("active");
        $(this).addClass("active");


        console.log(recipeId)
        console.log(recipeImg)
        console.log(recipeTitle)


    });

    $(".box").on("click", function () {

        if (showRecipes === true && recipeId != "") {
            $(this).html("");
            $(this).attr("data-food-id", recipeId);
            $(this).attr("data-food-img", recipeImg);
            $(this).attr("data-food-sum", recipeSum);
            $(this).attr("data-food-ing", recipeIng);
            $(this).attr("data-food-instr", recipeInstr);


            $(this).css("background-image", "url('" + recipeImg + "')");
            $(this).css("background-color", "#bfbfbf");
            $(this).css("background-blend-mode", "multiply");


            $(this).attr("data-filled", "true");

            var boxTitle = $("<p>");
            boxTitle.addClass("section truncate")
            boxTitle.text(recipeTitle);

            // var boxImage = $("<img>");
            // boxImage.addClass("food-pic")
            // boxImage.attr("src", recipeImg);

            $(this).append(
                boxTitle,
                // boxImage
            );
            console.log("recipe placed")

        } else if (showRecipes === true && recipeId === "") {

            $(this).html("");
            $(this).attr("data-food-id", "");
            $(this).attr("data-food-img", "");

            $(this).css("background-image", "url('')");
            $(this).css("background-color", "");
            $(this).css("background-blend-mode", "");

            $(this).attr("data-food-sum", "");
            $(this).attr("data-food-ing", "");
            $(this).attr("data-food-instr", "");
            $(this).attr("data-filled", "false");

            console.log("recipe removed");

        } else {
            boxId = $(this).attr("id");
            console.log(boxId);

            var cardId = $(this).attr("data-food-id");
            var cardImg = $(this).attr("data-food-img");
            var cardSum = $(this).attr("data-food-sum");
            var cardIng = $(this).attr("data-food-ing");
            var cardInstr = $(this).attr("data-food-instr");
            var cardTitle = $(this).text();

            console.log(cardId);
            console.log(cardImg);
            console.log(cardSum);


            // $("#recipe-image").attr("src", cardImg);
            $(".food-title").text(cardTitle);
            $(".food-image").attr("src", cardImg);
            $(".food-summary").html(cardSum);
            $(".ingredients").html(cardIng);
            $(".instructions").html(cardInstr);

            $(".food-instructions").addClass("hide");
            $(".food-instructions").attr("data-state", "hidden");
            $(".food-instructions").attr("id", cardId + "food-instructions");
            $(".instructions").attr("id", cardId + "instructions");
            $(".instructions-btn").attr("data-food-id", cardId);

            $(".food-ingredients").addClass("hide");
            $(".food-ingredients").attr("data-state", "hidden");
            $(".food-ingredients").attr("id", cardId + "food-ingredients");
            $(".ingredients").attr("id", cardId + "ingredients");
            $(".ingredients-btn").attr("data-food-id", cardId);

        }
    });

    $(".remove-btn").on("click", function () {
        $("#" + boxId).html("");
        $("#" + boxId).attr("data-food-id", "");

        $("#" + boxId).css("background-image", "url('')");
        $("#" + boxId).css("background-color", "");
        $("#" + boxId).css("background-blend-mode", "");

        $("#" + boxId).attr("data-filled", "false");
        $("#" + boxId).removeClass("modal-trigger");
        console.log("recipe removed");

    });

    // Saves Calendar meal plan to firebase
    $("#savePlan").on("click", function () {



        console.log(mealArray);

        for (i = 0; i < mealArray.length; i++) {
            meal = $("#" + mealArray[i]);
            console.log(mealArray[i]);
            var dataFilled = meal.attr("data-filled");
            var title = meal.text();
            var image = meal.attr("data-food-img");
            var summary = meal.attr("data-food-sum");
            var ingredients = meal.attr("data-food-ing");
            var instructions = meal.attr("data-food-instr");
            var recipeId = meal.attr("data-food-id");
            var style = meal.attr("style")
            // remember modal-trigger

            console.log(dataFilled);
            console.log(image);
            console.log(title);
            console.log(summary);
            console.log(ingredients);
            console.log(instructions);
            console.log(recipeId);
            console.log(style);
            bbbb

            var newMeal = {
                dataFilled: dataFilled,
                image: image,
                title: title,
                summary: summary,
                ingredients: ingredients,
                instructions: instructions,
                recipeId: recipeId,
                style: style
            };

            database.ref("/calendar/" + meal).push(newMeal);

            console.log("Plan saved!");
        };


    });


});