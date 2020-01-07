//////////////////////
// Element Selectors//
//////////////////////
let alcCheckEl = $('#alcCheck')
let runEl = $('#run')
let queryLengthEl = $('#queryLength')
let allDrinksEl = $('#allDrinks')
let eraButtonsEl = $('.eraButton')

////////////////
// API Queries//
////////////////
var alc = "Alcoholic";
var drinkSearch
var eraDrinkArrays = [
    {
        era: "20s-40s",
        id: "2040",
        drinkIds: ['11003', '12214', '11113', '17197', '11006']
    },
    {
        era: "50s-70s",
        id: "5070",
        drinkIds: ['14167', '11004', '12402', '11690', '11462']
    },
    {
        era: "80s-2000s",
        id: "802000",
        drinkIds: ['17207', '11007', '13056', '17204', '17196']
    },
    {
        era: "Present",
        id: "present",
        drinkIds: ['12127', '17180', '12196', '11009', '17829']
    },
]

eraButtonsEl.click(function () {
    allDrinksEl.empty();
    clickedEraId = $(this).attr('id')
    for (var i=0; i<eraDrinkArrays.length; i++) {
        if (eraDrinkArrays[i].id === clickedEraId) {
            for (var j=0; j<5; j++) {
                apiCallId(eraDrinkArrays[i].drinkIds[j])
            }
        }
    }
})

runEl.click(function (){
    drinkSearch = $('#drinkSearch').val()
    apiCall(drinkSearch)
})

alcCheckEl.click(function (){

    if (alcCheckEl.prop('checked')) {
        alc = "Non_Alcoholic"
    }
    else {
        alc = "Alcoholic"
    }
})

let apiCall = function (query) {
    var queryURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?a=${alc}&s=${query}`;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response)
        //declare ID to pass into api call by ID
        let id = response.drinks[0].idDrink
        //Call api with ids from above response
        apiCallId(id)
    })      
}

//Call individual drinks
let apiCallId = function (drinkId) {
    var queryURLTwo = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
    $.ajax({
        url: queryURLTwo,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
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
        drinkImageEl.attr("src", `${drinkImage}`)
        drinkInstEl.text(drinkInstructions)
        //append elements
        allDrinksEl.prepend(newDrink);
        newDrink.append(drinkNameEl)
        newDrink.append(drinkImageEl)
        newDrink.append(drinkInstEl)

    })       
}
