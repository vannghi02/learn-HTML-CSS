; (function (win, $) {
    function clickCategoryCar() {
        $('.btn_select').click(function () {
            $(this).toggleClass('is_active');
            $('.car_open').toggleClass('is_open')
        });
    }

    function clickActive() {
        $('.depth_lst_link').click(function () {
            $('.depth_lst_link').removeClass('is_active')
            $(this).addClass('is_active')
        });
    }

    function clickSelectLst() {
        const accordionItems = document.querySelectorAll(".select_lst_item");

        accordionItems.forEach((item) => {
            const btn = item.querySelector(".select_lst_btn");
            const content = item.querySelector(".depth_lst");

            btn.addEventListener("click", () => {
                accordionItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        const otherContent = otherItem.querySelector(".depth_lst");
                        otherItem.classList.remove("active");
                        otherContent.style.display = "none";
                    }
                });

                item.classList.toggle("active");

                if (item.classList.contains("active")) {
                    content.style.display = "block";
                } else {
                    content.style.display = "none";
                }
            });
        });
    }

    $(win).on('load', function () {
        clickCategoryCar();
        clickActive();
        clickSelectLst();
    });

})(window, window.jQuery);
