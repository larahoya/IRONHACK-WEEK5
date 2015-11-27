function onSubmit (event) {
  event.preventDefault();
  console.debug('SUBMITTED');
  var newCharacter = {
    name: $('#name-input').val(),
    occupation: $('#occupation-input').val(),
    weapon: $('#weapon-input').val()
  } 

  var request = $.post('https://ironhack-characters.herokuapp.com/characters', newCharacter)

  function onSaveSuccess (response) {
    console.debug('BOOM', response);
  }

  function onSaveFailure (err) {
    console.error(err.responseJSON);
  }

  request.done(onSaveSuccess);
  request.fail(onSaveFailure);
}

$('.js-submit').on('click', onSubmit);


function fetchCharacters () {
  var request = $.get('https://ironhack-characters.herokuapp.com/characters');

  function handleCharacters (characters) {
    characters.forEach(function(chr){
      var html = "<li>" + chr.name + " , " + chr.occupation + " , " + chr.occupation + "</li>"
      $(".js-character-list").append(html);
    });
  }

  function handleError (err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }

  request.done(handleCharacters);
  request.fail(handleError);
}

$('.js-characters').on('click', fetchCharacters);

