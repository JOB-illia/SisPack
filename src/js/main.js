window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	let gamburgerHead = document.querySelector('.header__head'),
		gamburgerBody = document.querySelector('.header__body');

	gamburgerHead.addEventListener('click', () => {
		gamburgerHead.classList.toggle('_gamburder-head-active');
		gamburgerBody.classList.toggle('_gamburger-body-active');
	})

});
