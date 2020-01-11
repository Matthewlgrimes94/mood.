var params = {
    auto_play: true,
    buying: false,
    sharing: false,
    liking : false,
    download: false,
    show_artwork: false,
    show_playcount: false,
    show_comments: false,
    show_user: false,
    start_track: 0,
    single_active: false
};

var playlists = {
    1920 : "https://soundcloud.com/bestling-ever/1920s-30s-40s-jazz-vintage-blends",
    1950 : "https://soundcloud.com/user-514864316/sets/1950-60-70",
    1980 : "https://soundcloud.com/nicklebackrocker/sets/1970s-2000s",
    now  : "https://soundcloud.com/user-589261654/sets/2010-2019bye"
};

var player = $("#player");
var widget= null;

var song = $("#songName");

var scWidgetUrl = "https://w.soundcloud.com/player/?";

function urlParams() {
    var strParams = JSON.stringify(params);
   return strParams.replace("{","").replace("}","").replace(/,/g,"&").replace(/:/g,"=")
        .replace(/"/g,"");

}

function displayWidget(){
    var iframe = $("#scWidget");
    
    iframe.attr("src", scWidgetUrl+"url=https://soundcloud.com/user-589261654/sets/2010-2019bye");
    
}

displayWidget();

$(document).ready(()=>{
    var widgetIframe = document.getElementById('scWidget');
    widget = SC.Widget(widgetIframe);
    widget.bind(SC.Widget.Events.PLAY, function() {
        widget.getCurrentSound(function(currentSound) {
            song.text(currentSound.title);
        });
      });
});

function play(){  
    widget.play();
}

function prev() {
    widget.prev();
}

function next(){  
    widget.next();
}

function pause() {
    widget.pause();
}

function loadPlaylist(playlist) {
    widget.load(playlist,params);  
}

$(".era").on("click", function() {
    var era = $(this).attr("data-era");
    player.removeClass("hide");
    loadPlaylist(playlists[era]);
});