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

    var showRecipes = false;
    var recipeId = "";
    var recipeImg = "";
    var recipeTitle = "";
    var boxId = "";

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
            $(this).attr("data-food-sum", recipeSum);
            $(this).attr("data-food-ing", recipeIng);
            $(this).attr("data-food-instr", recipeInstr);


            $(this).attr("data-filled", "true");

            var boxTitle = $("<p>");
            boxTitle.addClass("section truncate")
            boxTitle.text(recipeTitle);

            var boxImage = $("<img>");
            boxImage.addClass("food-pic")
            boxImage.attr("src", recipeImg);

            $(this).append(
                boxTitle,
                boxImage
            );
            console.log("recipe placed")

        } else if (showRecipes === true && recipeId === "") {

            $(this).html("");
            $(this).attr("data-food-id", "");
            $(this).attr("data-food-sum", "");
            $(this).attr("data-food-ing", "");
            $(this).attr("data-food-instr", "");
            $(this).attr("data-filled", "false");

            console.log("recipe removed");

        } else {
            boxId = $(this).attr("id");
            console.log(boxId);

            var cardId = $(this).attr("data-food-id");
            var cardImg = $(this).attr("src");
            var cardSum = $(this).attr("data-food-sum");
            var cardIng = $(this).attr("data-food-ing");
            var cardInstr = $(this).attr("data-food-instr");
            var cardTitle = $(this).text();

            $("#recipe-image").attr("src", cardImg);
            $(".food-title").text(cardTitle);
            $(".food-summary").html(cardSum);
            $(".ingredients-text").html(cardIng);
            $(".instructions-text").html(cardInstr);


        }
    });

    $(".remove-btn").on("click", function () {
        $("#" + boxId).html("");
        $("#" + boxId).attr("data-food-id", "");
        $("#" + boxId).attr("data-filled", "false");
        $("#" + boxId).removeClass("modal-trigger");
        console.log("recipe removed");

    });




});