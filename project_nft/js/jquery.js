var header = $("#header");
var scrollChange = 1;
$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= scrollChange) {
        header.addClass('active');
    } else {
        header.removeClass("active");
    }
});