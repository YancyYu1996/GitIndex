$(function () {
    //初始化 顶部轮播
    initTopSwiper();
    initMustBuy();
});

function initTopSwiper() {
    var mySwiper = new Swiper('#topSwiper', {
        loop: true,
        autoplay:2000,
        // 如果需要分页器
        pagination: '.swiper-pagination',

        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

    })
}

function initMustBuy() {
    var mySwiper = new Swiper('#swiperMenu', {
        slidesPerView: 3
    })
}