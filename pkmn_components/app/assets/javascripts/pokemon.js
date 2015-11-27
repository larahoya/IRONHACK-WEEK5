// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

(function() {

"use strict";

//DEFINICION DE CLASE
//clase pokemon
//PokemonApp.clase => para que la clase este dentro del namespace
PokemonApp.Pokemon = function(pokemonUri) {
  this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
};

//metodo render de cada una de las instancias: console log del id
PokemonApp.Pokemon.prototype.render = function() {

  var self = this;

  $('.js-evolution-modal').modal("hide");

  $.ajax({
    url: "/api/pokemon/" + this.id,
    success: function (response) {
      self.info = response;
      $(".js-pokemon-name").text(self.info.name);
      $(".js-pokemon-number").text(self.info.pkdx_id);
      $(".js-pokemon-height").text(self.info.height);
      $(".js-pokemon-weight").text(self.info.weight);
      $(".js-pokemon-hp").text(self.info.hp);
      $(".js-pokemon-attack").text(self.info.attack);
      $(".js-pokemon-defense").text(self.info.defense);
      $(".js-pokemon-sp-attack").text(self.info.sp_atk);
      $(".js-pokemon-sp-defense").text(self.info.sp_def);
      $(".js-pokemon-speed").text(self.info.speed);
      var types_info = "";
      self.info.types.forEach(function(type) {
        types_info += (type.name + " ");
      })
      $(".js-pokemon-types").text(types_info);
      

      var img_uri = self.info.sprites[0].resource_uri;
      $.ajax({
        url: "http://pokeapi.co" + img_uri,
        success: function(response2) {
          var img_src = "http://pokeapi.co" + response2.image;
          document.getElementById("js-pokemon-img").src = img_src;
        }
      });

      var description_uris = [];
      self.info.descriptions.forEach(function(desc) {
        description_uris.push(desc.resource_uri);
      })
      description_uris.sort();
      var descrip_uri = description_uris[description_uris.length -1];

      $.ajax({
        url: "http://pokeapi.co" + descrip_uri,
        success: function(response3) {
          var descrip = response3.description;
          $('.js-pokemon-descrip').text(descrip);
        }
      });

      var evol_uris = [];
      self.info.evolutions.forEach(function(evolution) {
        evol_uris.push(evolution.resource_uri);
      });

      if(evol_uris.length === 0) {
        $('.js-btn-evolution').hide();
      } else {
        $('.js-btn-evolution').show();
      };

      $('.js-btn-evolution').on('click', function() {

        $('.evol-modal-body').empty();

        evol_uris.forEach(function(uri) {
          $.ajax({
            url: "http://pokeapi.co" + uri,
            success: function(response4) {
              console.log(response4);
              var name = response4.name;
              var img_uri = response4.sprites[0].resource_uri;
              var uri = response4.resource_uri;
              $.ajax({
                url: "http://pokeapi.co" + img_uri,
                success: function(response5) {
                  var img_src = "http://pokeapi.co" + response5.image;
                  $('.evol-modal-body').append('<div><button class="js-show-pokemon btn btn-link" data-pokemon-uri="'+ uri + '">' + name + '</button><img src="' + img_src + '"></div>');
                }
              })
      
            }
          })
        })

        $('.js-evolution-modal').modal("show");
        $(".js-pokemon-modal").modal("hide");
        evol_uris = [];
      })

      $(".js-pokemon-modal").modal("show");
    }

  });

};

//metodo de clase que le das una uri y te devuelve un id
PokemonApp.Pokemon.idFromUri = function (pokemonUri) {
  var uriSegments = pokemonUri.split("/");
  var secondLast = uriSegments.length - 2;
  return uriSegments[secondLast];
};

//USO
$(document).on("ready", function() {

  $(document).on("click",".js-show-pokemon", function(event) {
    var $button = $(event.currentTarget);
    var pokemonUri = $button.data("pokemon-uri");

    var pokemon = new PokemonApp.Pokemon(pokemonUri);
    pokemon.render();
  });

});

})();