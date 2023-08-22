var swiper = new Swiper(".slider-banner", {
    spaceBetween: 0,
    loop: true,
    speed: 300,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
})

var swiper = new Swiper(".offers-mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});