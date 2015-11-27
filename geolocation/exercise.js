if ("geolocation" in navigator) {
  var button = $('#where-am-i');
  button.on('click', getLocation);
} else {
  alert("Geolocation is not available")
}

function getLocation() {
  console.log('Getting location...');
  navigator.geolocation.getCurrentPosition(onLocation, onError, options);
}

var options = {
  enableHighAccuracy: true 
};

function onLocation (position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  document.getElementById('location').innerHTML = 'Lat: ' + position.coords.latitude + ' , Lon: ' + position.coords.longitude;
  displayMap(latitude, longitude);
}

function onError(error) {
  console.log("Getting location failed: " + error);
}

function displayMap(lat, lon) {
  var url = "https://maps.googleapis.com/maps/api/staticmap?markers=" + lat + ',' + lon + '&size=2000x1000&zoom=17&maptype=satellite';
  document.getElementById('map').src = url;
}




// navigator.geolocation.getCurrentPosition(onLocation, onError, options)

// function onLocation (position) {
//   console.log('Your latitude is ' + position.coords.latitude);
//   console.log('Your longitude is ' + position.coords.longitude);
//   document.getElementById('position').innerHTML = 'Lat: ' + position.coords.latitude + ' , Lon: ' + position.coords.longitude
// }

// function onError (error) {
//   console.log(error)
// }

// var options = {
//   enableHighAccuracy: true
// }

// navigator.geolocation.watchPosition(onWatch, onError, options)

// function onWatch (position) {
//   console.log('Your latitude is ' + position.coords.latitude);
//   console.log('Your longitude is ' + position.coords.longitude);
//   document.getElementById('position').innerHTML = 'Lat: ' + position.coords.latitude + ' , Lon: ' + position.coords.longitude
// }

// function onError (error) {
//   console.log(error)
// }

// var options = {
//   enableHighAccuracy: true
// }




