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
        console.log("Display Non Alc only")
        alc = "Non_Alcoholic"
    }
    else {
        console.log("Display All")
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
        console.log(length)
        allDrinksEl.empty();

        for (var i = 0; i < length; i++) {
            //declare specific response values
            let drinkName = response.drinks[i].strDrink

            //create html elements for each response
            let newDrink = $('<div>');
            let drinkNameEl = $('<h3>')
            
            //set element values
            drinkNameEl.text(drinkName);
            allDrinksEl.append(newDrink);
            newDrink.append(drinkName)
    


        }
    }) 
    
        
}


