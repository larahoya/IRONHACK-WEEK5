if  (window.PokemonApp === undefined) {
  window.PokemonApp = {};
}
//name space para contener todo nuestras clases y funciones

PokemonApp.init = function () {
  //cualquier setup general aqui!
  console.log("Pokemon App ONLINE!");
};

$(document).on("ready", function() {
  PokemonApp.init();
});
//Aqui esperamos a que el DOM se complete para llamar al initialize
