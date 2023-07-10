;(function (win, $) {

    $(".nav").mouseleave(out);
    function out(){
        $(".depth").removeClass("is_on");
        $(".overlay").removeClass("is_active");
    }

    $('.nav-lst__btn').hover(function(){
        $('.nav-lst__btn').removeClass("is_active");
        $(this).addClass("is_active");
    });
    
    $('.nav-lst__btn').mouseover(function(){
        var id = $(this).attr("id");
        var current =  $('[data-id=' + id + ']');
        current.siblings().removeClass('is_on');
        current.addClass('is_on').parents('.depth').addClass('is_on');
    });

$(win).on('load', function () {

});
})(window, window.jQuery);
