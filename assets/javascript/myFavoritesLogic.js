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

    // event listener when a recipe is added
    database.ref("/recipes").on("child_added", function (snapshot) {

        var foodImage = snapshot.val().image;
        var foodTitle = snapshot.val().title;
        var foodSummary = snapshot.val().summary;
        var foodIngredients = snapshot.val().ingredients;
        var foodInstructions = snapshot.val().instructions;
        var foodId = snapshot.val().recipeId;

        console.log("------")
        console.log("printing object");


        var newRecipeCol = $("<div>");
        newRecipeCol.addClass("col s12");

        var newCardDiv = $("<div>");
        newCardDiv.addClass("card");

        // Create Image

        var newImageDiv = $("<div>");
        newImageDiv.addClass("card-image");

        var newImg = $("<img>");
        newImg.addClass("food-image");
        newImg.attr("src", foodImage);


        var newFavBtn = $("<a>");
        newFavBtn.addClass("favorite-btn btn-floating pink halfway-fab");
        newFavBtn.attr("href", "#!");
        newFavBtn.attr("data-faved", "true");
        newFavBtn.attr("data-food-id", foodId);

        var newMatIcon = $("<i>");
        newMatIcon.addClass("material-icons");
        newMatIcon.text("favorite");

        // Append Image

        newFavBtn.append(newMatIcon);
        newImageDiv.append(
            newImg,
            newFavBtn
        );

        // Create Card Content

        var newCardContent = $("<div>");
        newCardContent.addClass("card-content");

        var newTitle = $("<span>");
        newTitle.addClass("food-title card-title light-green-text text-darken-2");
        newTitle.text(foodTitle);

        var newH6Sum = $("<h6>");
        newH6Sum.addClass("orange-text text-lighten-1");
        newH6Sum.text("Diet Info");

        var newSummary = $("<p>");
        newSummary.addClass("food-summary grey-text");
        newSummary.html(foodSummary);

        var newIngDiv = $("<div>");
        newIngDiv.addClass("food-ingredients hide");
        newIngDiv.attr("id", foodId + "ingredients")
        newIngDiv.attr("data-state", "hidden");

        var newH6Ing = $("<h6>");
        newH6Ing.addClass("card-title light-green-text");
        newH6Ing.text("Ingredients");

        var newIngTable = $("<table>");
        newIngTable.addClass("ingredients");
        newIngTable.html(foodIngredients);

        var newInstrDiv = $("<div>");
        newInstrDiv.addClass("food-instructions hide");
        newInstrDiv.attr("id", foodId + "instructions")
        newInstrDiv.attr("data-state", "hidden");

        var newH6Instr = $("<h6>");
        newH6Instr.addClass("card-title light-green-text");
        newH6Instr.text("Instructions");

        var newInstrText = $("<table>");
        newInstrText.addClass("instructions");
        newInstrText.html(foodInstructions);

        // Append Card Content

        newIngDiv.append(
            newH6Ing,
            newIngTable
        );

        newInstrDiv.append(
            newH6Instr,
            newInstrText
        );

        newCardContent.append(
            newTitle,
            newH6Sum,
            newSummary,
            newIngDiv,
            newInstrDiv
        )

        // Create Card Action

        var newCardAction = $("<div>");
        newCardAction.addClass("card-action");

        var newIngBtn = $("<a>");
        newIngBtn.addClass("ingredients-btn");
        newIngBtn.attr("data-food-id", foodId);
        newIngBtn.attr("href", "#!");
        newIngBtn.text("Ingredients");

        var newInstrBtn = $("<a>");
        newInstrBtn.addClass("instructions-btn");
        newInstrBtn.attr("data-food-id", foodId);
        newInstrBtn.attr("href", "#!");
        newInstrBtn.text("Instructions");

        // Append Card Action

        newCardAction.append(
            newIngBtn,
            newInstrBtn
        )




        // Append all to Card then Column div
        newCardDiv.append(
            newImageDiv,
            newCardContent,
            newCardAction
        );
        newRecipeCol.append(newCardDiv);

        // Checks which column to add on recipe

        var col1Height = $("#col-1").height();
        var col2Height = $("#col-2").height();

        console.log("column 1: " + col1Height);
        console.log("column 2: " + col2Height);


        if (col1Height <= col2Height) {
            $("#col-1").append(newRecipeCol);
        } else {
            $("#col-2").append(newRecipeCol);
        }

        console.log("------")
    });
});