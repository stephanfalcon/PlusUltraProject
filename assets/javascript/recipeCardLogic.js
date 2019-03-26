$(document).ready(function () {

    // Basic favorite button color toggle

    $(document).on("click", ".favorite-btn", function () {

        var favStatus = $(this).attr("data-faved");
        console.log(favStatus);
        if (favStatus === "false") {
            $(this).removeClass("grey pulse");
            $(this).addClass("pink");
            $(this).attr("data-faved", "true");
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