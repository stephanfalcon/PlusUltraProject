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
        newRecipe.text(foodTitle);

        $("#recipe-area").append(newRecipe);


        console.log("------")
    });

    $(document).on("click", ".listed-food-recipe", function () {
        var recipeId = $(this).attr("data-food-id");
        var recipeImg = $(this).attr("data-food-img");
        var recipeTitle = $(this).text();

        console.log(recipeId)
        console.log(recipeImg)
        console.log(recipeTitle)

        $(".box").on("click", function () {
            $(this).html("");
            $(this).attr("data-food-id", recipeId);

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
        })


    });

});