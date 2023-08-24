;(function (win, $) {
    function clickCategoryCar(){
        $('.btn_select').click(function(){
            $(this).toggleClass('is-active');
            $('.car_open').toggleClass('is-open')
        });
    }

    clickCategoryCar();

    $(win).on('load', function () {
    });
})(window, window.jQuery);
