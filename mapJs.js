var locations = [];
var open_left=false;
var open_right=false;
function start(){
    left_a_link=document.getElementById("left");
    right_a_link=document.getElementById("right");
    left_a_link.addEventListener("click",left_handler,false);
    go_back_content=document.getElementById("map");
    go_back_content.addEventListener("click",back,false);
    go_back_head=document.getElementById("top");
    go_back_head.addEventListener("click",back,false);
}
$(function() {
  $.get('https://spreadsheets.google.com/feeds/list/1PfwNgNqYSLfCjUcHyPFTHNekRnu89SYh0rdzTuwtPtM/1/public/values?alt=json', function(data) {
    var d = data.feed.entry;
    for(var i in d) {
      var item = {};
      item.name = d[i].gsx$name.$t;
      item.longitude = d[i].gsx$longitude.$t;
      item.latitude = d[i].gsx$latitude.$t;
      item.phone = d[i].gsx$phone.$t;
      locations.push(item);
    }
    build();
  });
});


function build(){
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: new google.maps.LatLng(25.151409, 121.773),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i].longitude, locations[i].latitude),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i].name);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}
function left_handler(e){
  if(open_left==false){
      id=document.getElementsByClassName("left-list");
      id2=document.getElementsByClassName("list-left");
      id[0].setAttribute("class","left-list left-right-list-open");
      for(let i=0;i<id2.length;i++){
          id2[i].setAttribute("class","list-left list-left-open");
      }
      content_black();
      setTimeout(function(){ open_left=true;console.log(open_left); }, 200);
      e.preventDefault();
  }
}
function right_handler(e){
  if(open_right==false){
      id=document.getElementsByClassName("right-list");
      console.log(id[0]);
      id[0].setAttribute("class","right-list left-right-list-open");
      content_black();
      setTimeout(function(){ open_right=true;console.log(open_right); }, 200);
      e.preventDefault();
  }
}
function back(e){
  if(open_left==true){
      id=document.getElementsByClassName("left-right-list-open");
      id[0].setAttribute("class","left-list");
      id2=document.getElementsByClassName("list-left list-left-open");
      for(let i=0;i<id2.length;){
          id2[i].setAttribute("class","list-left");
      }
      open_left=false;
      content_back();
      e.preventDefault();
  }
  else if(open_right==true){
      id=document.getElementsByClassName("right-list left-right-list-open");
      id[0].setAttribute("class","right-list");
      open_right=false;
      content_back();
      e.preventDefault();
  }
}
function content_black(){
  id=document.getElementsByClassName("hover_all");
  id[0].setAttribute("class","hover_all hover_all_black");
}
function content_back(){
  id=document.getElementsByClassName("hover_all hover_all_black");
  id[0].setAttribute("class","hover_all");
}
window.addEventListener("load",start,false);
