; (function (win, $) {
    function clickCategoryCar() {
        $('.btn_select').click(function () {
            $(this).toggleClass('is-active');
            $('.car_open').toggleClass('is-open')
        });
    }

    function clickActive() {
        $('.depth_lst_link').click(function () {
            $('.depth_lst_link').removeClass('is-active')
            $(this).addClass('is-active')
        });
    }

    const btnMobile = document.querySelectorAll('.select_lst li button');

    btnMobile.forEach(btn => {
        btn.addEventListener('click', clickSelectLst);
    });

    function clickSelectLst() {
        let checkSubSelect = this.nextElementSibling;

        if (checkSubSelect.classList.contains('depth_lst') && checkSubSelect.style.display === 'block') {
            checkSubSelect.previousElementSibling.classList.remove("is-show");
        }

        if (checkSubSelect.classList.contains('depth_lst') && checkSubSelect.style.display !== 'block') {
            const selectLstBtns = document.querySelectorAll('.select_lst_btn');
            selectLstBtns.forEach(btn => {
                if (btn.classList.contains('is-show')) {
                    btn.classList.remove('is-show');
                }
            });

            checkSubSelect.previousElementSibling.classList.add("is-show");
        }
    }

    $(win).on('load', function () {
        clickCategoryCar();
        clickSelectLst();
        clickActive();
        clickSelectLst();
    });

})(window, window.jQuery);
