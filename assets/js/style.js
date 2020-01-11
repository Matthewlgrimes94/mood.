// DOM
let erasEl = $('.eras');
let backgroundEl = $('body');
let era1 = $('#1');
let era2 = $('#2');
let era3 = $('#3');
let era4 = $('#4');
let era1Text = $('#2040');
let era2Text = $('#5070');
let era3Text = $('#802000');
let era4Text = $('#present');
let logo = $('#logo');
let currentEra;
let allDrinks = $('#allDrinks');

let playerDiv = $("#player");
let playerButtons = $(".player-button");
let songNameDiv = $("#songName");

erasEl.on('click', '.eraButton', function(){
    backgroundEl.removeClass(`${currentEra}`);
    if ($(this).attr('id') === '2040') {
        currentEra = 'e2040';
        backgroundEl.addClass('e2040');
        lightMode();
    } else if ($(this).attr('id') === '5070') {
        currentEra = 'e5070';
        backgroundEl.addClass('e5070');
        lightMode()
    } else if ($(this).attr('id') === '802000') {
        currentEra = 'e802000';
        backgroundEl.addClass('e802000');
        darkMode();
    } else if ($(this).attr('id') === 'present') {
        currentEra = 'present';
        backgroundEl.addClass('present');
        lightMode()
    }
});

function lightMode () {
    allDrinks.addClass('eraIconLight');
    allDrinks.addClass('light');
    allDrinks.removeClass('eraIconDark');
    allDrinks.removeClass('dark');
    logo.attr('src','./images/moodwhite.png');
    era1.removeClass('eraIconDark');
    era1.addClass('eraIconLight');
    era1Text.addClass('light');
    era1Text.removeClass('dark');
    era2.removeClass('eraIconDark');
    era2.addClass('eraIconLight');
    era2Text.addClass('light');
    era2Text.removeClass('dark');
    era3.removeClass('eraIconDark');
    era3.addClass('eraIconLight');
    era3Text.addClass('light');
    era3Text.removeClass('dark');
    era4.removeClass('eraIconDark');
    era4.addClass('eraIconLight');
    era4Text.addClass('light');
    era4Text.removeClass('dark');

    playerButtons.removeClass('dark');
    playerButtons.addClass('light');
    songNameDiv.removeClass('dark');
    songNameDiv.addClass('light');
    playerDiv.removeClass('eraIconDark');
    playerDiv.addClass('eraIconLight');
}

function darkMode () {
    allDrinks.addClass('eraIconDark');
    allDrinks.addClass('dark');
    allDrinks.removeClass('eraIconLight');
    allDrinks.removeClass('light');
    logo.attr('src','./images/mood.png');
    era1.removeClass('eraIconLight');
    era1.addClass('eraIconDark');
    era1Text.addClass('dark');
    era1Text.removeClass('light');
    era2.removeClass('eraIconLight');
    era2.addClass('eraIconDark');
    era2Text.addClass('dark');
    era2Text.removeClass('light');
    era3.removeClass('eraIconLight');
    era3.addClass('eraIconDark');
    era3Text.addClass('dark');
    era3Text.removeClass('light');
    era4.removeClass('eraIconLight');
    era4.addClass('eraIconDark');
    era4Text.addClass('dark');
    era4Text.removeClass('light');

    playerButtons.removeClass('light');
    playerButtons.addClass('dark');
    songNameDiv.removeClass('light');
    songNameDiv.addClass('dark');
    playerDiv.removeClass('eraIconLight');
    playerDiv.addClass('eraIconDark');
}