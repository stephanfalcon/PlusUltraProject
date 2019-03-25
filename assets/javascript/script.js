
var query

$("#submit").on("click", function(){
    query = $("#search").val()
    
    var queryURL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ingredients=${query}`

    $.ajax({
    url: queryURL,
    method: "GET",
    headers: { 'X-RapidAPI-Key': 'cc0b6b6f3emsh013cc6fac059723p1ff573jsnc5d6e66a0737' }
  }).then(function(result) {
    console.log(result)
    cardMaker(result);
  })



})

function cardMaker(result){
    for(i in result){
        card = $("<div>")
        card.addClass("card")

        title = $("<h3>")
        title.text(result[i].title)

        image =$("<img>")
        image.attr("src", result[i].image)

        card.append(title)
        card.append(image)

        $("#cardHolder").append(card)
    }
}

