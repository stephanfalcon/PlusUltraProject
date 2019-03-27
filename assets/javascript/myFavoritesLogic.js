$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD-gfXOisqgvlaXUH9SCnSjTvh5Ab8QRQY",
        authDomain: "my-awesome-app-thing.firebaseapp.com",
        databaseURL: "https://my-awesome-app-thing.firebaseio.com",
        projectId: "my-awesome-app-thing",
        storageBucket: "my-awesome-app-thing.appspot.com",
        messagingSenderId: "784955336009"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    $("#favorite-cards").html("");

    $(document).on("click", ".favorite-btn", function () {

        var image = $("#recipe-image").attr("src");
        var title = $("#recipe-title").text();
        var summary = $("#recipe-summary").text();
        var ingredients = $("#recipe-ingredients").html();
        var instructions = $("#recipe-instructions").html();

        console.log(image);
        console.log(title);
        console.log(summary);
        console.log(ingredients);
        console.log(instructions);

        var newRecipe = {
            image: image,
            title: title,
            summary: summary,
            ingredients: ingredients,
            instructions: instructions,
        };

        database.ref("/recipes").push(newRecipe);

        console.log("Recipe Added");




    });

    database.ref("/recipes").on("child_added", function (snapshot) {

        var foodImage = snapshot.val().image;
        var foodTitle = snapshot.val().title;
        var foodSummary = snapshot.val().summary;
        var foodIngredients = snapshot.val().ingredients;
        var foodInstructions = snapshot.val().instructions;

        console.log("------")
        console.log("printing object");


        var newRecipeCol = $("<div>");
        newRecipeCol.addClass("col m12 l6");

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

        var newSummary = $("<p>");
        newSummary.addClass("food-summary");
        newSummary.text(foodSummary);

        var newIngDiv = $("<div>");
        newIngDiv.addClass("food-ingredients hide");
        newIngDiv.attr("data-state", "hidden");

        var newH6Ing = $("<h6>");
        newH6Ing.addClass("card-title light-green-text");
        newH6Ing.text("Ingredients");

        var newInstrDiv = $("<div>");
        newInstrDiv.addClass("food-instructions hide");
        newInstrDiv.attr("data-state", "hidden");

        var newH6Instr = $("<h6>");
        newH6Instr.addClass("card-title light-green-text");
        newH6Instr.text("Instructions");

        // Append Card Content

        newIngDiv.append(
            newH6Ing,
            foodIngredients
        );

        newInstrDiv.append(
            newH6Instr,
            foodInstructions
        );

        newCardContent.append(
            newTitle,
            newSummary,
            newIngDiv,
            newInstrDiv
        )

        // Create Card Action

        var newCardAction = $("<div>");
        newCardAction.addClass("card-action");

        var newIngBtn = $("<a>");
        newIngBtn.addClass("ingredients-btn");
        newIngBtn.attr("href", "#!");
        newIngBtn.text("Ingredients");

        var newInstrBtn = $("<a>");
        newInstrBtn.addClass("instructions-btn");
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
        $("#favorite-cards").append(newRecipeCol);

        console.log("------")
    });
});