
$('#btn-submit').on('click', function(event) {
  event.preventDefault();
  var input_artist = $('#input-name').val()
  var request = $.get('https://api.spotify.com/v1/search?type=artist&query='+ input_artist);

  function handleArtist(object) {
    var artists = object.artists.items;
    $('#artist-list').empty();
    artists.forEach(function(item) {
      if(item.images.length != 0) {
        html = '<div class="col-xs-2"><div class="show-artist"><h6>' + item.name + '</h6><img class="artist-img" data-id="'+ item.id +'" src=' + item.images[0].url + '></div></div>';
        $('#artist-list').append(html);
      };
    })
  }

  function handleError (err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }

  request.done(handleArtist);
  request.fail(handleError);
});


$(document).on('click', '.artist-img', function(event) {
  var id = event.currentTarget.dataset.id;
  var request = $.get('https://api.spotify.com/v1/artists/' + id + '/albums')

  function handleAlbums(object) {
    $('#list').empty();
    object.items.forEach(function(item) {
      html = '<a href="" class="album-a" data-id="' + item.id + '">' + item.name + '</a><br>'
      $('#list').append(html);
    })
    var secondRequest = $.get('https://api.spotify.com/v1/artists/' + id + '/related-artists')
    function handleRelated(object2) {
      $('#list').append('<h4>Related artists</h4>');
      object2.artists.slice(0,5).forEach(function(art) {
      html = '<li>'+ art.name + '</li>';
      $('#list').append(html);
    })
    }
    function handleError (err1, err2, err3) {
      console.error('OH NO!!', err1, err2, err3);
    }
    secondRequest.done(handleRelated);
    secondRequest.fail(handleError);
    $('#modal-title').text('List of albums');
    $('#my_modal').modal('show');
  }
  function handleError (err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }
  request.done(handleAlbums);
  request.fail(handleError);
});

$('#list').on('click', '.album-a', function(event) {
  event.preventDefault();
  var id = event.currentTarget.dataset.id;
  var request = $.get('https://api.spotify.com/v1/albums/' + id + '/tracks');

  function handleTracks(object) {
    $('#list').empty();
    object.items.forEach(function(item) {
      html = '<li><a target="_blank" href="' + item.preview_url + '">' + item.name + '</a></li>'
      $('#list').append(html);
    })
    $('#modal-title').text('List of tracks');
    $('#my_modal').modal('show');
  }
  function handleError (err1, err2, err3) {
    console.error('OH NO!!', err1, err2, err3);
  }
  request.done(handleTracks);
  request.fail(handleError);
})


