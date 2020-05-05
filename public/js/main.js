window.addEventListener('DOMContentLoaded', () => {
   'use strict';




   // меню
   let burger = document.querySelector('.header__burger'),
      menu = document.querySelector('.header__nav'),
      headerBottom = document.querySelector('.header__bottom');

   burger.addEventListener('click', () => {
      burger.classList.toggle('_burger-acrtive');
      menu.classList.toggle('_nav-active');
   });
   let gamburgerHead = document.querySelector('.header__head'),
      gamburgerBody = document.querySelector('.header__body');

   gamburgerHead.addEventListener('click', () => {
      gamburgerHead.classList.toggle('_gamburder-head-active');
      gamburgerBody.classList.toggle('_gamburger-body-active');
   });
   window.addEventListener('scroll', function (event) {
      if (document.documentElement.scrollTop >= 116) {
         headerBottom.classList.add('_fixed-menu');
      } else {
         headerBottom.classList.remove('_fixed-menu');
      }
   });


   if (window.screen.availWidth < 991.98) {
      let boxContact = document.querySelector('.header__contact'),
         headerTop = document.querySelector('.header__top'),
         boxsHeaderTop = document.querySelectorAll('.header__item'),
         basket = document.querySelector('.header__basket'),
         boxExit = document.querySelector('.header__exit'),
         boxSearch = document.querySelector('.header__search');





      // перенос блоков на мобилке 
      boxsHeaderTop[2].prepend(boxContact);
      headerTop.prepend(burger);
      headerTop.prepend(menu);
      headerTop.prepend(boxSearch);
      menu.appendChild(basket);
      menu.appendChild(boxExit);


      // модальное окно телефонов
      boxContact.children[0].addEventListener('click', () => {
         boxContact.children[1].classList.toggle('_phone-active');
      });
      document.documentElement.addEventListener('click', (e) => {
         if (boxContact.children[1].classList.contains('_phone-active')) {
            if (!e.target.closest('.header__contact') && !e.target.classList.contains('header__contact-body')) {
               boxContact.children[1].classList.remove('_phone-active');
            }
         }
      });




      // создание и присваивание иконки поиска на клик 

      let searchIcon = document.createElement('div');
      boxsHeaderTop[2].prepend(searchIcon);
      searchIcon.classList.add('icon-search');
      searchIcon.classList.add('icon-search--click');
      searchIcon.addEventListener('click', () => {
         boxSearch.classList.toggle('_active-search');
      });
      document.documentElement.addEventListener('click', (e) => {
         if (boxSearch.classList.contains('_active-search')) {
            if (!e.target.classList.contains('icon-search--click') && !e.target.closest('.header__search')) {
               boxSearch.classList.remove('_active-search');
            }
         }
      });
   }

   // filter 
   let filterBox = document.querySelectorAll('.click-link'),
      filterSubItems = document.querySelectorAll('.filter__sub-items');
   filterBox.forEach(function (items) {
      items.addEventListener('click', function (e) {
         e.preventDefault();
         items.nextElementSibling.classList.toggle('filter__sub-items--active');
      });
   });
   // filter-mobile 
   let burgerFilterMobile = document.querySelector('.filter-burger'),
      boxFilterMobile = document.querySelector('.filter');
   burgerFilterMobile.addEventListener('click', function () {
      boxFilterMobile.classList.toggle('_filter--active');
      this.classList.toggle('_burger-filter--active');
   })



   // sort 

   let sortHead = document.querySelectorAll('.sort__head');
   sortHead.forEach(function (items) {
      items.addEventListener('click', function () {
         items.nextElementSibling.classList.toggle('sort__body--active');
      });
   });


});
