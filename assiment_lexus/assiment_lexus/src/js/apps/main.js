; (function (win, $) {
    $(".header-nav").mouseleave(out);
    function out() {
        $('.nav__btn').removeClass("is_none");
    }

    $('.nav__btn').mouseover(function () {
        $('.nav__btn').addClass('is_none')
    });

    $('.nav__btn').mouseover(function () {
        $('.nav__btn').removeClass('is_active');
        $(this).addClass('is_active')
    });

    $(win).on('load', function () {
    });
})(window, window.jQuery);
