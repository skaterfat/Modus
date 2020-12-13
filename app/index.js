import jQuery from 'jquery';
//import $ from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import { Tooltip, Toast, Popover } from 'bootstrap';
//import Inputmask from 'inputmask';
require("inputmask/dist/jquery.inputmask.min.js");
import 'owl.carousel';
//require("slick-carousel/slick/slick.min.js");
require("@fancyapps/fancybox/dist/jquery.fancybox.min.js");
require("waypoints/lib/jquery.waypoints.min.js");
//import { CountUp } from 'countup.js';
//require("./app/js/dist/jquery.countup.js");
//import PerfectScrollbar from 'perfect-scrollbar';
//import anime from 'animejs/lib/anime.es.js';
//const Handlebars = require("handlebars");
require("select2/dist/js/select2.min.js");
require("jquery-validation/dist/jquery.validate.min.js");
require("jquery-validation/dist/localization/messages_ru.min.js");
require("jquery-touchswipe/jquery.touchSwipe.min.js");

/*global.jQuery = $;
global.$ = $;*/

(function($) {

	$(document).ready(function() {

		$("input.mask-phone").inputmask({"mask": "+7 (999) 999-9999"});
		$("input.mask-email").inputmask({
			mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
			greedy: false,
			onBeforePaste: function (pastedValue, opts) {
				pastedValue = pastedValue.toLowerCase();
				return pastedValue.replace("mailto:", "");
			},
			definitions: {
				'*': {
					validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
					casing: "lower"
				}
			}
		});

		if($('.js-select2').length > 0)
			$('.js-select2').select2({
				minimumResultsForSearch: -1,
				placeholder: function(){
					$(this).data('placeholder');
				}
				//width: 'element'
			});

		if($('a.fancybox-interface').length > 0)
			$('a.fancybox-interface').fancybox({
				buttons: ["close"],
				animationEffect: false,
				afterLoad: function(instance, current) {	

					if(instance.$trigger.find('img[src$=".svg"]').length > 0) {
						var $imgScreen = instance.$trigger.find('img[src$=".svg"]').clone();
						$('<div class="fancybox-content__screen"/>').append($imgScreen).appendTo(instance.$refs.inner.find('.fancybox-content'));
					}				

					/*var pixelRatio = window.devicePixelRatio || 1;

					if ( pixelRatio > 1.5 ) {
						current.width  = current.width  / pixelRatio;
						current.height = current.height / pixelRatio;
					}*/

					current.width  = current.width  / 2;
					current.height = current.height / 2;

				},
			});

		$('.step__form-check .form-check-input').on('change', function(event) {
			event.preventDefault();
			
			if($(this).siblings('.form-control').length > 0) {

				if($(this).prop('checked')) {
					$(this).siblings('.form-control').removeAttr('disabled').focus();
				}

			}

			var radios = $(this).closest('.step__box-wrap').find('.step__form-check');
			$(radios).each(function(index, el) {				
				if($(el).find('.form-control') && !$(el).find('.form-check-input').prop('checked'))
					$(this).find('.form-control').attr('disabled', true).val("");
			});

		});

		$('.scale__dot').on('click', function(event) {
			event.preventDefault();
			var cbId = $(this).attr('data-radio-id'),
				left = parseInt(parseFloat($(this).css('left')) / parseFloat($(this).parent().width()) * 100),
				curIndex = ($(this).index());

			if($(this).parent().find('.scale__dot').length == curIndex)
				left = 100;

			$("#" + cbId).trigger('click');
			$(this).siblings('.scale__bar').css("width", left + "%");
			$(this).siblings('.scale__dot').removeClass('--active');
			$(this).parent().find('.scale__dot:lt('+curIndex+')').addClass('--active');

		});

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

		if($('a.smooth-scroll').length) {
			$('a.smooth-scroll').on('click', function(event) {
				var href = $(this).attr("href"),
					offsetTop = href === "#" ? 0 : $(href).offset().top;
				$('html, body').stop().animate({ 
					scrollTop: offsetTop - ($('.category-menu').height() ? $('.category-menu').height() : 0)
				}, 500);
			});
		}


		$(window).on('scroll', function(event) {

			var sticky = $('.category-menu'),
				scroll = $(window).scrollTop();

			if (scroll >= stickyOffset) sticky.addClass('--sticky');
			else sticky.removeClass('--sticky');


		}).on('resize', function(event) {
			stickyOffset = $('.category-menu').offset().top;				
		});		

		if($(".category-menu__form-select").length > 0) {

			$('.category-menu__form-select').on('change', function(event, isScroll) {

				if(isScroll)
					return false;

				var href = $(this).val();

				if(href.indexOf('#') == 0 && $(href).length > 0) {
					$(".category-menu .category-menu__list .menu-list__item a[href^='"+href+"']").trigger('click', [true]);
				}
				else
					window.location.href = href;
			});

		}

		if($(".category-menu .category-menu__list .menu-list__item a[href^='#']").length > 0) {

			var menuItems = $(".category-menu .category-menu__list .menu-list__item a[href^='#']");

			menuItems.on('click', function(event, select2) {

				event.preventDefault();

				var href = $(this).attr("href"),
					offsetTop = href === "#" ? 0 : $(href).offset().top;

				$('html, body').stop().animate({ 
					scrollTop: offsetTop - $('.category-menu').height()
				}, 500);

				if(!select2) {
					$('.category-menu__form-select').val(href);
					$('.category-menu__form-select').trigger('change');
				}

			});

			$(window).on('scroll', function() {

				var scrollPos = $(document).scrollTop();

				menuItems.each(function(index, item) {

					var href = $(item).attr("href");

					if($(href).position().top <= (scrollPos + 0)) {
						$(".category-menu .category-menu__list .menu-list__item").removeClass("--active");
						$(item).parent().addClass("--active");
						$('.category-menu__form-select').val(href);
						$('.category-menu__form-select').trigger('change', [true]);
					}
					else
						$(item).parent().removeClass("--active");

				});
								  
			});

		}

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
				nav: false,
				navText: ['<div class="owl__nav-left"></div>', '<div class="owl__nav-right"></div>'],
				responsive : {
					0 : {
						nav: false,
					},
					767.99 : {
						nav: true
					}
				}
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
				/*stagePadding: 40,
				margin: 16,*/
				/*autoWidth:true,
				margin:30,
				autoHeight:false*/
				dots: true,
				nav: false,
    			autoWidth: true,
				navText: ['<div class="owl__nav-left"></div>', '<div class="owl__nav-right"></div>'],
				responsive : {
					0 : {
						items: 1,
						margin: 20,
					},
					991.99 : {
						items: 1,
						margin: 24,
					},
					1169.99 : {
						items: 3,
						nav: true,
						margin: 16
					}
				}
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



		$('.modus-ims__for-whom .for-whom__tabs .tabs__content').swipe({
			swipeLeft: function(event, phase, direction, distance) {
				$('.tabs__nav-left').trigger('click');
			},
			swipeRight: function(event, phase, direction, distance) {
				$('.tabs__nav-right').trigger('click');
			},
			allowPageScroll:"auto",
			threshold: 75
		});

		$(window).on('resize', function(event) {
			$('.owl-carousel.owl-loaded').trigger('refresh.owl.carousel');				
		});

		$('*[data-modal]').on('click', function(event) {
			event.preventDefault();
			var modalName = $(this).data('modal');
			$('html').addClass('overflow-hidden');
			$('body').addClass('body--popup-show');
			$('.popup--' + modalName).addClass('--active');
		});

		$('.popup__close, .popup__btn.--close').on('click', function(event) {
			event.preventDefault();
			$(this).closest('.popup').removeClass('--active');
			$('html').removeClass('overflow-hidden');
			$('body').removeClass('body--popup-show');
		});

		$('#open-welcome').on('click', function(event) {
			/*event.preventDefault();
			var modalName = $(this).data('modal-popup');
			$('.popup--' + modalName).addClass('popup--active');
			//alert($(window).scrollTop());
			$('body').addClass('show-popup');*/
		});

		$('.popup__close-circle, .popup__btn-close').on('click', function(event) {
			/*event.preventDefault();

			$(this).closest('.popup').removeClass('popup--active');
			$('body').removeClass('show-popup');

			if($(this).closest('.popup').hasClass('popup--welcome'))
				setCookie('WELCOME_POPUP', 1, {expires: 86400 * 30 * 365 * 2, path: '/'});*/
		});

		$(document).on('mouseup', function(event) {
			event.preventDefault();
			if($('body').hasClass('body--popup-show')) {
				var container = $(".popup.--active .popup__gradient");
				if (!container.is(event.target) && container.has(event.target).length === 0)
					container.find('.popup__close').trigger('click');
			}	
		});

		//Данный блок формы находится под управлением в CMS
		/**var $modusImsExpressDiagnosticForm = $('form[name="FORM_MODUS_IMS_EXPRESS_DIAGNOSTIC"]');

		if($modusImsExpressDiagnosticForm.length) {

			validateModusImsExpressDiagnosicSteps();

			$modusImsExpressDiagnosticForm.find('select, input[type="radio"], input[type="checkbox"]').on('change', function(event) {
				validateModusImsExpressDiagnosicSteps();
			});

			$modusImsExpressDiagnosticForm.find('textarea, input[type="text"], input[type="tel"], input[type="email"]').on('blur', function(event) {
				validateModusImsExpressDiagnosicSteps();
			});

			function validateModusImsExpressDiagnosicSteps() {

				$modusImsExpressDiagnosticForm.find('.steps__step .step__number').removeClass('--focus --complete');


				var bStep1Complete = true,
					bStep2Complete = true,
					bStep3Complete = true,
					bStep4Complete = true;
				
				$modusImsExpressDiagnosticForm.find('.steps__step').each(function(index, element) {
					
					// step 1
					if(index == 0) {

						if($(element).find('select').val().length == 0)
							bStep1Complete = false;

						if(bStep1Complete)
							$(element).find('.step__number').addClass('--complete');

					}					
					// step 2
					else if(index == 1) {

						if($(element).find('input[type="radio"]:checked').length == 0)
							bStep2Complete = false;

						if(bStep2Complete)
							$(element).find('.step__number').addClass('--complete');

					}		
					// step 3
					else if(index == 2) {

						$(element).find('.step__box').each(function(i, box) {


							//Если бокс содержит только текстареа
							if($(box).find('input[type="radio"]').length == 0) {

								if($(box).find('textarea').length && $(box).find('textarea').val().length == 0)
									bStep3Complete = false;

							}
							else {
									
								if($(box).find('input[type="radio"]:checked').length) {

									if(
										($(box).find('input[type="radio"]:checked').siblings('textarea').length && $(box).find('input[type="radio"]:checked').siblings('textarea').val().length == 0) ||
										($(box).find('input[type="radio"]:checked').siblings('input[type="text"]').length && $(box).find('input[type="radio"]:checked').siblings('input[type="text"]').val().length == 0)

									)
										bStep3Complete = false;
								}
								else
									bStep3Complete = false;
							}

						});

						if(bStep3Complete)
							$(element).find('.step__number').addClass('--complete');

					}
					// step 4
					else if(index == 3) {

						$(element).find('input[type="text"]:required, input[type="tel"]:required, input[type="email"]:required').each(function(i, el) {
							if($(el).val().length == 0)
								bStep4Complete = false;
						});

						if(bStep4Complete)
							$(element).find('.step__number').addClass('--complete');

					}

				});

				if(!bStep1Complete)
					$modusImsExpressDiagnosticForm.find('.steps__step:eq(0) .step__number').addClass('--focus');
				else if(!bStep2Complete)
					$modusImsExpressDiagnosticForm.find('.steps__step:eq(1) .step__number').addClass('--focus');
				else if(!bStep3Complete)
					$modusImsExpressDiagnosticForm.find('.steps__step:eq(2) .step__number').addClass('--focus');
				else if(!bStep4Complete)
					$modusImsExpressDiagnosticForm.find('.steps__step:eq(3) .step__number').addClass('--focus');

				return (bStep1Complete && bStep2Complete && bStep3Complete && bStep4Complete);

			}
			
		}**/

		//Данный блок формы находится под управлением в CMS
		/**
		$('.popup--mini form input.form-control').on('focus change input', function(event) {

			var inputIndex = parseInt($(this).parent().index('.popup__form-group')),
				progress = $(this).closest('.popup').find('.popup__progress');

			progress.find('.progress-dot:eq('+inputIndex+')').addClass('--active');
			validateMiniFormProgressBar();


		}).on('blur', function(event) {
			var inputIndex = parseInt($(this).parent().index('.popup__form-group')),
				progress = $(this).closest('.popup').find('.popup__progress'),
				thisProgressDot = progress.find('.progress-dot:eq('+inputIndex+')');

			thisProgressDot.removeClass('--active');
			validateMiniFormProgressBar();

		});

		function validateMiniFormProgressBar() {

			var progress = $('.popup--mini').find('.popup__progress');

			$('.popup--mini form input.form-control').each(function(index, input) {

				var inputIndex = parseInt($(input).parent().index('.popup__form-group')),
					thisProgressDot = progress.find('.progress-dot:eq('+inputIndex+')');

				//alert(inputIndex)

				if(!$(input).is(":focus"))
					thisProgressDot.removeClass('--active');
				
				if($(input).val().length == 0) {
					thisProgressDot.removeClass('--complete');
				}
				else {
					thisProgressDot.addClass('--complete');
				}

			});

			var lastCompleteDot = progress.find('.progress-dot.--complete:last'),
				left = lastCompleteDot.length > 0 ? parseInt(parseFloat(lastCompleteDot.css('left')) / parseFloat(progress.width()) * 100) : 0;

			progress.children('.progress-bar').css('width', left + "%");

		}
		**/
		
	});

})(jQuery);