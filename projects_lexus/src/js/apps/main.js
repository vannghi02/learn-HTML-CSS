; (function (win, $) {
  if (screen.width > 1024) {
    $(".nav").mouseleave(out);
    function out() {
      $('.nav-lst__btn').removeClass("is-none");
      $(".depth").removeClass("is-on");
      $(".overlay").removeClass("is-active");
      $('.depth-details').removeClass('is-show');
      $('.depth-sub__item').removeClass('is-show');
      $('.btn-close').removeClass('is-on');
      $('.depth-menu__item').removeClass('is-on');
    }

    $('.nav-lst__btn').mouseover(function () {
      $('.nav-lst__btn').addClass("is-none");
    });

    $('.nav-lst__btn').mouseover(function () {
      $('.nav-lst__btn').removeClass("is-active");
      $(this).addClass("is-active");
    });

    $('.nav-lst__btn').mouseover(function () {
      var id = $(this).attr("id");
      var current = $('[data-id=' + id + ']');
      current.siblings().removeClass('is-on');
      current.addClass('is-on').parents('.depth').addClass('is-on');
    });

    $('.depth-menu__item').hover(function () {
      $('.depth-menu__item').removeClass('is-on');
      $(this).addClass('is-on');
    });

    $('.depth-sub__item').hover(function () {
      $('.depth-sub__item').removeClass('is-show');
      $(this).addClass('is-show');
      $('.btn-close').addClass('is-on');
      $('.depth__inner').addClass('is-on')
    });

    $(".icon-lst__link").mouseleave(outIcon);
    function outIcon() {
      $('.icon-lst__link').removeClass("is-active");
    }

    $('.icon-lst__link').mouseover(function () {
      $(this).addClass("is-active");
    });

    $(win).on('load', function () {
      initSlider();
    });
  }

  if (screen.width < 1024) {
    $('.btn-menu').click(function () {
      $('.btn-menu').toggleClass("is-active");
      $('.nav').toggleClass('is-active');
      $('body').toggleClass('is-active')
    });

    const btnMenuMobile = $('.nav-lst li button');

    btnMenuMobile.on('click', handleShowSubMenu);

    function handleShowSubMenu() {
      let checkSubMenu = $(this).next();

      if (checkSubMenu.is('.depth-mb') && checkSubMenu.is(':visible')) {
        checkSubMenu.slideUp();
        checkSubMenu.siblings('.nav-lst__btn').removeClass("is-show");
      }

      if (checkSubMenu.is('.depth-mb') && !checkSubMenu.is(':visible')) {
        $('.depth-mb:visible').slideUp();
        checkSubMenu.slideDown();
        $('.nav-lst__btn').removeClass('is-show');
        checkSubMenu.siblings('.nav-lst__btn').addClass("is-show");
      }
    }

    const btnMobileFooter = $('.footer-lst li strong');

    btnMobileFooter.on('click', handleShowMenuFooter);

    function handleShowMenuFooter() {
      let checkSubMenu = $(this).next();

      if (checkSubMenu.is('.footer-link') && checkSubMenu.is(':visible')) {
        checkSubMenu.slideUp();
        checkSubMenu.siblings('.footer-lst__title').removeClass("is-show");
      }

      if (checkSubMenu.is('.footer-link') && !checkSubMenu.is(':visible')) {
        $('.footer-link:visible').slideUp();
        checkSubMenu.slideDown();
        $('.footer-lst__title').removeClass('is-show');
        checkSubMenu.siblings('.footer-lst__title').addClass("is-show");
      }
    }

    

    $(win).on('load', function () {
    });
  }

  // Slider section 1
  let swiper;
  let swiper2;
  function initSlider() {
    if (swiper || swiper2 !== undefined) {
      $(swiper).each((_, item) => {
        item.destroy();
      });
      swiper2.destroy();
    }

    swiper = new Swiper(".slider-models__one", {
      slidesPerView: 1.3,
      spaceBetween: 0,
      breakpoints: {
        1024: {
          slidesPerView: 2,
        },
      },
      speed: 600,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      slideToClickedSlide: true,
    });

    if (swiper.length !== undefined) {
      swiper.forEach(slide => {
        slide.on('slideChange', function () {
          let currentTitle = $(`[id-active=active${slide.activeIndex + 1}]`);
          currentTitle.siblings().removeClass('is-on');
          currentTitle.addClass('is-on');
        });
      });
    }
    swiper2 = new Swiper(".slider-models__two", {
      speed: 400,
      spaceBetween: 0,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        slideChange: function () {
          if (swiper2.activeIndex == 1 || swiper2.activeIndex == 2 || swiper2.activeIndex == 3 || swiper2.activeIndex == 4 || swiper2.activeIndex == 5 || swiper2.activeIndex == 6) {
            $('.title').addClass('is-white')
            $('.models-lst__btn').addClass('is-white')
            $('.btn-models__link').removeClass('is-black')
            $('.btn-models__link').addClass('is-white')
            $('.title-name__txt').addClass('is-white')
            $('.swiper-pagination').addClass('is-white')
            $('.btn-models').addClass('is-white')
            $('.btn-models').removeClass('is-black')

          } else {
            $('.title').removeClass('is-white')
            $('.models-lst__btn').removeClass('is-white')
            $('.btn-models__link').removeClass('is-white')
            $('.btn-models__link').addClass('is-black')
            $('.title-name__txt').removeClass('is-white')
            $('.swiper-pagination').removeClass('is-white')
            $('.btn-models').addClass('is-black')
            $('.btn-models').removeClass('is-white')
          }
        }
      }
    });

    swiper2.on('slideChange', function () {
      let currentTitle = $(`[data-title=title${swiper2.activeIndex + 1}]`);
      currentTitle.siblings().removeClass('is-on');
      currentTitle.addClass('is-on');
    });
  }

  $('.models-lst__btn').click(function () {
    var id_slider = $(this).attr("id-slider");
    var current_slider = $('[data-id-slider=' + id_slider + ']');
    current_slider.siblings().removeClass('is-on');
    current_slider.addClass('is-on');
    $('.title').removeClass('is-white')
    $('.models-lst__btn').removeClass('is-white')
    $('.btn-models__link').removeClass('is-white')
    $('.btn-models__link').addClass('is-black')

    if ($('.swiper-text__content').hasClass('is-on')) {
      $('.swiper-text__content').removeClass('is-on');
      $("[id-active=active1]").addClass('is-on');
    }

    initSlider();
  });

  $('.models-lst__btn').click(function () {
    $('.models-lst__btn').removeClass("is-active");
    $(this).addClass("is-active");
  });

  $('.stories-btn').click(function () {
    $('.stories-lst__item').addClass('is-on')
    $('.stories-btn').addClass('is-none')
    $('.stories-category').addClass('is-block')
  });

  $('.brand-film__btn').click(function () {
    $('.brand-film__popup').addClass('is-on')
  })

  $('.btn-close').click(function () {
    $(".depth").removeClass("is-on");
    $(".overlay").removeClass("is-active");
    $('.nav-lst__btn').removeClass("is-active");
    $('.nav-lst__btn').removeClass('is-on')
    $('.brand-film__popup').removeClass('is-on')
  });

  $('.depth').click(remove);
  function remove() {
    $('.nav-lst__btn').removeClass("is-none");
    $(".depth").removeClass("is-on");
    $(".overlay").removeClass("is-active");
    $('.depth-details').removeClass('is-show');
    $('.depth-sub__item').removeClass('is-show');
    $('.btn-close').removeClass('is-on');
    $('.depth-menu__item').removeClass('is-on');
  }
  $(win).on('load resize', function () {
  initSlider()
});
}) (window, window.jQuery);