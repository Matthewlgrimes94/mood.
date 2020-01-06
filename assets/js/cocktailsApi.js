//////////////////////
// Element Selectors//
//////////////////////
let alcCheckEl = $('#alcCheck')
let runEl = $('#run')
let queryLengthEl = $('#queryLength')
let allDrinksEl = $('#allDrinks')

////////////////
// API Queries//
////////////////
var alc = "Alcoholic";


runEl.click(function (){
    apiCall()
})

alcCheckEl.click(function (){

    if (alcCheckEl.prop('checked')) {
        alc = "Non_Alcoholic"
    }
    else {
        alc = "Alcoholic"
    }
})

let apiCall = function () {
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + alc;
    let length = queryLengthEl.val()
    console.log('apicall')
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        // console.log(length)
        allDrinksEl.empty();
        for (var i = 0; i < length; i++) {
            //declare ID to pass into api call by ID
            let id = response.drinks[i].idDrink
            //Call api with ids from above response
            apiCallId(id)
        }
    })      
}

//Call individual drinks
let apiCallId = function (drinkId) {
    var queryURLTwo = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
    $.ajax({
        url: queryURLTwo,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // allDrinksEl.empty();
        // for (var i = 0; i < length; i++) {
            //declare specific response values
            let drinkName = response.drinks[0].strDrink
            let drinkImage = response.drinks[0].strDrinkThumb
            let drinkInstructions = response.drinks[0].strInstructions
            //create html elements for each response
            let newDrink = $('<div>');
            let drinkNameEl = $('<h3>')
            let drinkImageEl = $('<img>')
            let drinkInstEl = $('<p>')
            //set element values
            drinkNameEl.text(drinkName);
            drinkImageEl.attr("src", `${drinkImage}/preview`)
            drinkInstEl.text(drinkInstructions)
            //append elements
            allDrinksEl.append(newDrink);
            newDrink.append(drinkNameEl)
            newDrink.append(drinkImageEl)
            newDrink.append(drinkInstEl)

        // }
    })       
}



