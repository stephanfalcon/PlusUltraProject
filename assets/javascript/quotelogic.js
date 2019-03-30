$(document).ready(function () {
    var queryURL = "https://healthruwords.p.rapidapi.com/v1/quotes/?t=Motivational&maxR=1&size=medium"

    // AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "b134db0813mshc069d1de8564e24p12b245jsn7ce80f90cfa9"
        }
    }).then(function (fin) {
        for (var i = 0; i < fin.length; i++) {
            var newQuote = fin[i].media
            $("#quotespace").attr("src", newQuote);
            $("#quotespace").html(newQuote);

        };
        console.log(fin);
    });
    // End of AJAX request
});