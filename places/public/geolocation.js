var map;
var markers = JSON.parse(window.localStorage.getItem("markers")) || [];

if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(onLocation, onError);
}

function onLocation(position){
  // We can't just directly feed the position into our google map
  // The objects are formatted differently, google maps is looking for
  // an object with "lat" and "lng" keys.
  var myPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  createMap(myPosition);
  setupAutocomplete();
}

function onError(err){
  console.log("What are you using, IE 7??", err);
}

function createMarker(position) {
  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
  markers.push(position);
  var strMarkers = JSON.stringify(markers);
  window.localStorage.setItem("markers", strMarkers);

  var contentString = "HOLA";
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

function createMap(position){
  var mapOptions = {
    center: position,
    zoom: 17
  };
  map = new google.maps.Map($('#map')[0], mapOptions);
  createMarker(position);
  markers.forEach(function(marker) {
    var position = {
      lat: marker.lat,
      lng: marker.lng
    };
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });
  });
}

function setupAutocomplete(){
  var input = $('#get-places')[0];
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function(){
    var place = autocomplete.getPlace();
    if (place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
      var position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      createMarker(position);
    } else {
      alert("The place has no location...?")
    }
  });
}