$(document).ready(function () {

    // Basic favorite button color toggle

    $(document).on("click", ".fav-btn", function () {

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



});