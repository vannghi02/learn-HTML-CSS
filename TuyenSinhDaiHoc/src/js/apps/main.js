;(function (win, $) {
    $('.menu_lst_link').click(function(){
        $('.menu_lst_link').removeClass('active');
        $(this).addClass('active')
    })

    $(win).on('load', function () {
    });
})(window, window.jQuery);
