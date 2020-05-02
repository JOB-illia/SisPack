var swiper = new Swiper('.first-screen .swiper-container', {
   speed: 800,
   //effect: 'fade', // "slide", "fade", "cube", "coverflow" or "flip"
   autoHeight: false,
   spaceBetween: 0,
   slidesPerView: 1,
   slidesPerColumn: 1,
   centeredSlides: false,
   loop: false,
   // slideNextClass: 'name-class',
   // slidePrevClass: 'name-class',
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   pagination: {
      el: '.swiper-pagination',
   },
   // breakpoints: {
   //  320: {
   //    slidesPerView: 2,
   //    spaceBetween: 20
   //  },
   //  480: {
   //    slidesPerView: 3,
   //    spaceBetween: 30
   //  },
   //  640: {
   //    slidesPerView: 4,
   //    spaceBetween: 40
   //  }
   //}
   //on: {
   //  init: function () {
   //    console.log('swiper initialized'); 
   //  },
   //},


});