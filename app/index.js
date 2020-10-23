import jQuery from 'jquery';
//import $ from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import { Tooltip, Toast, Popover } from 'bootstrap';
//import Inputmask from 'inputmask';
//require("inputmask/dist/jquery.inputmask.min.js");
import 'owl.carousel';
//require("slick-carousel/slick/slick.min.js");
//require("@fancyapps/fancybox/dist/jquery.fancybox.min.js");
require("waypoints/lib/jquery.waypoints.min.js");
//import { CountUp } from 'countup.js';
//require("./app/js/dist/jquery.countup.js");
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

		var stickyOffset = $('.category-menu').offset().top;

		$(window).on('scroll', function(event) {

			var sticky = $('.category-menu'),
				scroll = $(window).scrollTop();

			if (scroll >= stickyOffset) sticky.addClass('--sticky');
			else sticky.removeClass('--sticky');


		});

		$('.turnover-list__item-title').waypoint({
			handler: function(direction) {

				var counter = $(this.element).children('span'),
					endVal = parseInt(counter.attr('data-to')),
					progressbar = $(this.element).siblings('.turnover-list__item-progressbar').children('span');

				progressbar.css({width: endVal + "%"}); 

				$({countNum: counter.text()}).animate(
					{
						countNum: endVal
					},
					{
						duration: 2000,
						easing: 'linear',
						step: function() {
							counter.text(Math.floor(this.countNum));
						},
						complete: function() {
							counter.text(this.countNum);
						}

					}
				);

				this.destroy();

			},
			offset: '80%'
		});

		if($('.--modus-ims-cases-owl-carousel').length > 0) {
			var $owlModusImsCases = $(".--modus-ims-cases-owl-carousel");
			$owlModusImsCases.owlCarousel({
				center: false,
				loop: true,
				items: 1,
				dots: true,
				nav: true,
				navText: ['<div class="owl__nav-left"></div>', '<div class="owl__nav-right"></div>']
				/*margin: 17,
				stagePadding: 38,
				stagePadding: 50,
				margin:0,
				stagePadding: 70,
				nav: false,
				navText: ['<div class="owl__nav-left"></div>', '<div class="owl__nav-right"></div>'],
				responsive : {
					991.99 : {
						center: false,
						loop: true,
						items: 1,
						/*margin: 20,
						stagePadding: 50,*//*
						nav: true,
						navText: ["",""]
					}
				}*/
			});
		}

		if($('.--modus-ims-news-owl-carousel').length > 0) {
			var $owlModusImsNews = $(".--modus-ims-news-owl-carousel");
			$owlModusImsNews.owlCarousel({
				center: true,
				loop: true,
				items: 3,
				/*stagePadding: 40,*/
				margin: 16,
				/*autoWidth:true,
				margin:30,
				autoHeight:false*/
				dots: true,
				nav: true,
				navText: ['<div class="owl__nav-left"></div>', '<div class="owl__nav-right"></div>']
				/*responsive : {
					768 : {
						center: true,
						loop: true,
						items: 3,
						nav: true,
						navText: ["",""]
					}
				}*/
			});
		}

		$('.tabs__list-item > a').on('click', function(event) {

			event.preventDefault();

			if($(this).parent().hasClass('--active'))
				return false;

			var tabId = $(this).data('tab');

			$('.tabs__content').removeClass('--active');
			$('#'+tabId).addClass('--active');

			$('.tabs__list-item.--active').removeClass('--active');
			$(this).parent().addClass('--active');

		});

		$('.tabs__nav-left').on('click', function(event) {

			event.preventDefault();

			if($(this).next().find('.tabs__list-item.--active').prev().length > 0)
				$(this).next().find('.tabs__list-item.--active').prev().children('a').trigger('click');
			else
				$(this).next().find('.tabs__list-item:last-child > a').trigger('click');


		});

		$('.tabs__nav-right').on('click', function(event) {

			event.preventDefault();

			if($(this).prev().find('.tabs__list-item.--active').next().length > 0)
				$(this).prev().find('.tabs__list-item.--active').next().children('a').trigger('click');
			else
				$(this).prev().find('.tabs__list-item:first-child > a').trigger('click');


		});


		
	});

})(jQuery);