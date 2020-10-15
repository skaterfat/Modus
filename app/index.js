import jQuery from 'jquery';
//import $ from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import { Tooltip, Toast, Popover } from 'bootstrap';
//import Inputmask from 'inputmask';
//require("inputmask/dist/jquery.inputmask.min.js");
//import 'owl.carousel';
//require("slick-carousel/slick/slick.min.js");
//require("@fancyapps/fancybox/dist/jquery.fancybox.min.js");
//import PerfectScrollbar from 'perfect-scrollbar';
//import anime from 'animejs/lib/anime.es.js';
//const Handlebars = require("handlebars");

/*global.jQuery = $;
global.$ = $;*/

(function($) {

	$(document).ready(function() {

		$('.header__hamburger').on('click', function(event) {
			event.preventDefault();
			$('body').addClass('body--nav-show');
		});

		$('.header__navigation-close').on('click', function(event) {
			event.preventDefault();
			$('body').removeClass('body--nav-show');
		});

		$('.nav-list__item.--dropdown > a').on('click', function(event) {
			event.preventDefault();
			$(this).closest('.header__nav-list').addClass('--submenu-opened');
			$(this).parent().addClass('--active');
		});

		$('.nav-list__item.--dropdown > div > a.back').on('click', function(event) {
			event.preventDefault();
			$(this).closest('.nav-list__item.--dropdown').removeClass('--active');
			$(this).closest('.header__nav-list').removeClass('--submenu-opened');
		});

		$('.header__search-icon-open').on('click', function(event) {
			event.preventDefault();
			$('.header__navigation').addClass('--search-opened');
			$(this).siblings('form').children('input[type="text"]').focus();
		});

		$('.header__search-icon-close').on('click', function(event) {
			event.preventDefault();
			$('.header__navigation').removeClass('--search-opened');
			$(this).siblings('form').children('input[type="text"]').blur();
		});
		
	});

})(jQuery);