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
   //window.addEventListener('scroll', function (event) {
   //let target = event.target;
   //});


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
      boxsHeaderTop[2].prepend(searchIcon);


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
});
