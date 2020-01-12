$(document).foundation()

//////////////////////
// Element Selectors//
//////////////////////
let alcCheckEl = $('#alcCheck')
let runEl;
let queryLengthEl = $('#queryLength')
let allDrinksEl = $('#allDrinks')
let eraButtonsEl = $('.eraButton')
var modal = $('#modal');
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
    searchGen()
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
        //declare ID to pass into api call by ID
        let id = response.drinks[0].idDrink
        //Call api with ids from above response
        apiCallId(id)
    }).fail(function(resp){
        modal.foundation('open');
    });
}

//Call individual drinks
let apiCallId = function (drinkId) {
    var queryURLTwo = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;
    $.ajax({
        url: queryURLTwo,
        method: "GET"
    }).then(function(response) {
        //declare specific response values
        let drinkName = response.drinks[0].strDrink
        let drinkImage = response.drinks[0].strDrinkThumb
        let drinkInstructions = response.drinks[0].strInstructions
        let ingredients = [
            {ing: response.drinks[0].strIngredient1, amt: response.drinks[0].strMeasure1},
            {ing: response.drinks[0].strIngredient2, amt: response.drinks[0].strMeasure2},
            {ing: response.drinks[0].strIngredient3, amt: response.drinks[0].strMeasure3},
            {ing: response.drinks[0].strIngredient4, amt: response.drinks[0].strMeasure4},
            {ing: response.drinks[0].strIngredient5, amt: response.drinks[0].strMeasure5},
            {ing: response.drinks[0].strIngredient6, amt: response.drinks[0].strMeasure6},
            {ing: response.drinks[0].strIngredient7, amt: response.drinks[0].strMeasure7},
            {ing: response.drinks[0].strIngredient8, amt: response.drinks[0].strMeasure8},
            {ing: response.drinks[0].strIngredient9, amt: response.drinks[0].strMeasure9},
            {ing: response.drinks[0].strIngredient10, amt: response.drinks[0].strMeasure10},
            {ing: response.drinks[0].strIngredient11, amt: response.drinks[0].strMeasure11},
            {ing: response.drinks[0].strIngredient12, amt: response.drinks[0].strMeasure12},
            {ing: response.drinks[0].strIngredient13, amt: response.drinks[0].strMeasure13},
            {ing: response.drinks[0].strIngredient14, amt: response.drinks[0].strMeasure14},
            {ing: response.drinks[0].strIngredient15, amt: response.drinks[0].strMeasure15},
        ]

        var ingList = $('<ul>');

        for (var i=0; i<ingredients.length; i++) {
            if (ingredients[i].ing !== null) {
                let newIng = $('<li>')
                let amount = ingredients[i].amt
                if (amount !== null) {
                    newIng.text(`${ingredients[i].ing} -- ${ingredients[i].amt}`)
                } else newIng.text(`${ingredients[i].ing}`)
                ingList.append(newIng)
            }
        }


        let accordionHTML = $(`<li class="accordion-item" data-accordion-item>
        <a href="#" class="accordion-title">${drinkName}</a>
        <div class="accordion-content" data-tab-content>
          <div class="media-object">
            <div class="media-object-section">
              <img src= "${drinkImage}" class="drinkImage" alt="">
            </div>
            <div class="media-object-section">
              <p>${drinkInstructions}</p>
              <ul>${ingList.html()}</ul>
            </div>
          </div>
        </div>`)

        allDrinksEl.prepend(accordionHTML)
        Foundation.reInit('accordion');
    })
}

let searchGen = function () {
    let searchHTML = $(`<li class="accordion-item" data-accordion-item>
        <a href="#" class="accordion-title">Is your favorite drink missing? Search it Here!</a>
        <div class="accordion-content" data-tab-content>
          <div class="media-object searchDiv">
                <form>
                    <label>
                    Search for drink:
                    <input type="text" id="drinkSearch"><button class="hollow button secondary"type="submit" id='run'>Search!</button>
                    </label>
                    <label>
                    <input type="checkbox" name="Non-Alcoholic" id="alcCheck">
                    Non-Alcoholic
                    </label>    
                </form>
            </div>
        </div>`)

        allDrinksEl.append(searchHTML)
        runEl = $('#run')    
        runEl.click(function (event){
            event.preventDefault()
            drinkSearch = $('#drinkSearch').val()        
            if (!drinkSearch) return
            else apiCall(drinkSearch)
        })
}

let runFunc = function (event) {
    event.preventDefault()
    drinkSearch = $('#drinkSearch').val()
    if (!drinkSearch) return
    else apiCall(drinkSearch)

}