; (function (win, $) {
  function slideBannerModels() {
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

    $(".btn-play").click(function () {
      $(this).toggleClass('is-play');
      if ($(this).hasClass("is-play")) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    });
  }
  slideBannerModels();

  $('.menu-lst__link').click(function () {
    $('.menu-lst__link').removeClass('is-active');
    $(this).addClass('is-active');
  });

  $('.btn-select').click(function () {
    $(this).toggleClass('is-show');
    $('.info-menu').toggleClass('is-open')
  });

  $('.cat-lst__link').click(function () {
    $('.cat-lst__link').removeClass('is-active');
    $(this).addClass('is-active');
  });

  $('.info-menu__link').click(function () {
    $('.info-menu__link').removeClass('is-active');
    $(this).addClass('is-active');
  });
  
  var img = 0;
  var pan = 0;
  var myElement = document.getElementById("product");
  var hammertime = new Hammer(myElement);
  hammertime.on("panleft panright", function (e) {
    if (parseInt(e.distance / 40) != pan) {
      pan = parseInt(e.distance / 40);
      if (e.type == "panleft") {
        img++;
        if (img > 11){
          return img = 0;
        }
      }
      if (e.type == "panright") {
        img--;
        if (img < 0){
          return img = 11;
        } 
      }
      
      $("#product img:not(:nth-child(" + (img + 1) + "))").removeClass("is-active");
      $("#product img:nth-child(" + (img + 1) + ")").addClass("is-active");
    }
  });
  
  $("body").mousedown(function () {
    pan = 0;
  });

  $('.color-lst__item').click(function () {
    $('.color-lst__item').removeClass('is-active');
    $(this).addClass('is-active');
  });


  $('.color-lst__btn').click(function () {
    var id_img = $(this).attr("data-interior");
    var current_img = $('[id-interior=' + id_img + ']');
    current_img.siblings().removeClass('is-active');
    current_img.addClass('is-active');
  });
  
  AOS.init();

  $(win).on('load resize', function () {
    slideBannerModels();
  });

})(window, window.jQuery);
