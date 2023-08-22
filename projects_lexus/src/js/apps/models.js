var swiper = new Swiper(".sliderBanner", {
  spaceBetween: 0,
  loop: true,
  allowTouchMove: false,
  effect: 'fade',
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(".btn-play").click(function(){
  $(this).toggleClass('is-play');
  if($(this).hasClass("is-play")) {
    swiper.autoplay.start();
  }else {
    swiper.autoplay.stop();
  }
});
