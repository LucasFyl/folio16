/*jshint -W117 */
/*jslint latedef:false*/
/* jshint unused:false */
(function(){
	'use strict';
	
	var Navigation = {
		init: function(){
			TweenMax.set('#navigation', {display:'none'});
			Navigation.bindEvents();
		},
		open: function(){
			var navTl = new TimelineMax({paused:true});

			navTl.set('#navigation li, #navigation li a', {opacity:0});
			navTl.play();
		},
		close: function(){
			TweenMax.to('#navigation li', 0.35, {y:20,opacity:0,ease:Power3.easeIn});
			TweenMax.set('#navigation', {display:'none',delay:0.35});
		},
		bindEvents: function(){
			$('body').on('click', '.menu-trigger', function(event){
				event.preventDefault();
				if ( $(this).hasClass('trigger') ) {
					$(this).removeClass('trigger').addClass('close');
					Navigation.open();
				} else {
					$(this).removeClass('close').addClass('trigger');
					Navigation.close();
				}
			});
			$(document).keyup(function(event){
				if(event.which === 27) {
					$('.menu-trigger').removeClass('close').addClass('trigger');
				  	Navigation.close();
				}
			});	
		}
	};

	// Navigation.init();

})();