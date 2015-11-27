var price = 13;
$('li#sauce, li#crust').hide();

$('.btn-pepperonni').on('click', function(){
  $('.pep').toggle();

  if($('.btn-pepperonni').hasClass('active')){
    price -= 1;
  } else {
    price += 1;
  };
  $('.panel.price strong').text('$' + price);

  $('.btn-pepperonni').toggleClass('active');

  $('li#pepperoni').toggle();
});

$('.btn-mushrooms').on('click', function(){
  $('.mushroom').toggle();

  if($('.btn-mushrooms').hasClass('active')){
    price -= 1;
  } else {
    price += 1;
  };
  $('.panel.price strong').text('$' + price);

  $('.btn-mushrooms').toggleClass('active');

  $('li#mushroom').toggle();
});

$('.btn-green-peppers').on('click', function(){
  $('.green-pepper').toggle();

  if($('.btn-green-peppers').hasClass('active')){
    price -= 1;
  } else {
    price += 1;
  };
  $('.panel.price strong').text('$' + price);

  $('.btn-green-peppers').toggleClass('active');

  $('li#green-pepper').toggle();
});

$('.btn-crust').on('click', function(){
  $('.crust').toggleClass('crust-gluten-free');

  if($('.btn-crust').hasClass('active')){
    price -= 5;
  } else {
    price += 5;
  };
  $('.panel.price strong').text('$' + price);

  $('.btn-crust').toggleClass('active');

  $('li#crust').toggle();
});

$('.btn-sauce').on('click', function(){
  $('.sauce').toggleClass('sauce-white');

  if($('.btn-sauce').hasClass('active')){
    price -= 3;
  } else {
    price += 3;
  };
  $('.panel.price strong').text('$' + price);

  $('.btn-sauce').toggleClass('active');

  $('li#sauce').toggle();
});


