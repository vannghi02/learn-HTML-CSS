; (function (win, $) {
  function slideBannerModels(){
    var swiper = new Swiper(".sliderBanner", {
      spaceBetween: 0,
      loop: true,
      allowTouchMove: false,
      effect: 'fade',
      autoplay: {
        delay: 8000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
    
    swiper.on('slideChangeTransitionStart', function () {
      let currentText = $(`[text-id-slide=slide${swiper.realIndex + 1}]`);
      console.log(swiper.realIndex + 1);
      currentText.siblings().removeClass('is-on');
      currentText.addClass('is-on');
    });
    
    $(".btn-play").click(function(){
      $(this).toggleClass('is-play');
      if($(this).hasClass("is-play")) {
        swiper.autoplay.start();
      }else {
        swiper.autoplay.stop();
      }
    });
  }
  slideBannerModels();

  $('.menu-lst__link').click(function(){
    $('.menu-lst__link').removeClass('is-active');
    $(this).addClass('is-active');
  });

  $('.btn-select').click(function(){
    $(this).toggleClass('is-show');
    $('.info-menu').toggleClass('is-open')
  });

  $(win).on('load resize', function () {
    slideBannerModels()
  });

}) (window, window.jQuery);
