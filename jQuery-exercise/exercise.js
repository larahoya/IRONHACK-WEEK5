var phrases = [
  "I like pie.",
  "Add some of your own phrases here!",
  "Make sure to follow all but the last phrase with a comma.",
  "This is a jquery exercise.",
  "This is very funny.",
  "I love ruby.",
  "I need more phrases.",
  "Ironhack."
];

function changePhrase() {
  var random_n = Math.floor(Math.random()*phrases.length);
  $('#phrase').text(phrases[random_n]);
  var n = random_n + 1
  $("li").css('color', 'black');
  $("li:nth-of-type("+ n +")").css('color', 'red');
};

function addPhrase() {
  var phrase = $('#input-phrase').val();
  phrases.push(phrase);
};

function getList() {
  var List = "";
  for(var i=0; i<phrases.length; i++) {
    List += "<li>" + phrases[i] + " <img src='./aplic.png' class='delete'></li>";
  }
  return List
}


$(document).on('ready', changePhrase);

$('#btn-refresh').on('click', changePhrase);

document.onkeydown = function() {
  if(window.event.keyCode == "13" && $('#input-phrase').val() != "" && document.activeElement === $('#input-phrase')[0]) {
    addPhrase();
    $('#last').remove();
    $('#phrases-list').html(getList());
    $('#input-phrase').val('');
  } else if($('#input-phrase').val().length == 1 && document.activeElement === $('#input-phrase')[0]){
    $('#phrases-list').append('<li id="last"></li>');
    $('#last').text(''+ phrase +'');
  } else if($('#input-phrase').val() != "" && document.activeElement === $('#input-phrase')[0]) {
    var phrase = $('#input-phrase').val();
    $('#last').text(''+ phrase +'');
  }
}

$('#phrases-list').html(getList())

$('#phrases-link').on('click', function(event) {
  event.preventDefault();
  if ($('#phrases-link').hasClass('active')) {
    $('#phrases-link').text('Hide sentences');
  } else {
    $('#phrases-link').text('Show sentences');
  };
  $('#phrases-list').toggle();
  $('#phrases-link').toggleClass('active');
});

$('.delete').on('click', function(event) {
  $(event.currentTarget).parent().remove();
  n = $(event.currentTarget).id
  phrases.splice(n,1);
})





