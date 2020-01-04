
var alc = "Non_Alcoholic";
var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + alc;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    for (var i = 0; i < response.length; i++) {
        let drinkName = response.drinks[i].strDrink
        console.log(response.drinks[0].strDrink)
    }
    // $.each(response, function( index, value ) {
    //     console.log(response.drinks[0].strDrink)
    // });
    // console.log(response.drinks[i].strDrink)
})



