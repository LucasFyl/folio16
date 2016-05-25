/*jshint -W117 */
/*jslint latedef:false*/
/* jshint unused:false */
var isMobile = false; //initiate as false
// var controller = new ScrollMagic.Controller();


$(document).ready(function(){
	'use strict';
 	initPage();
 });

// Page load event
function initPage(){
	'use strict';

	detectMobile();

	Navigation.init();

	if($('main.home').length) {
		hideLoaderHome();
	} else {
		hideLoader();
	}

	setTimeout(function(){
		if ( $('main.home').length ) {
			initHomePage();
		}
	}, 3500); // loaderTl.duration() = 2.75 (w/ 1s fade) (+2)
	
}
function detectMobile(){
	'use strict';
	$('.isMobile').is(':visible') ? isMobile = true : isMobile = false;
	console.log('isMobile:',isMobile);
}
function hideLoaderHome(){
	'use strict';

	var loaderTl = new TimelineMax();
	var barH = $('#loader .bar').height();

	TweenMax.set('article:first .text p', {opacity:0});
	TweenMax.set('#projects-gallery', {className:'+=no-line'});
	TweenMax.set('.slick-dots li', {className:'+=hidden'});

	loaderTl.to('#loader .bar', 0.25, {width:'37%',ease:Power3.easeIn})
			.to('#loader .bar', 0.5, {width:'52%',ease:Power3.easeOut})
			.to('#loader .bar', 1, {width:'96%',ease:Power3.easeOut})
			.to('#loader .bar', 0.5, {width:'100%',ease:Power3.Out})
			.to('#loader .bar', 0.25, {top:-barH,ease:Power3.Out})
			// until here basic loading bar w/ exit
			.set('.grid', {zIndex:'99999'}).set('.grid div', {height:0})
			.to('.grid div', 1, {height:'100%',ease:Power3.InOut})
			// draw grid bars
			.set('#loader', {display:'none'})
			.to('.grid div', 0.5, {className:'+=empty'})

			// .to('#loader', 1, {opacity:0,display:'none',ease:Power3.InOut})
			.set('.grid', {zIndex:'-1'})
			// // hide loader and reset grid bars zIndex
			.set('#projects-gallery', {className:'-=no-line'})
			.staggerTo('article:first .text p', 0.5, {opacity:1, ease:Expo.easeOut}, 0.15)
			// draw black line
			// .staggerFromTo('main .dots-container li', 0.3, {opacity:0, y:50}, {opacity:1,y:0,ease:Power2.easeOut}, 0.2, '+=0.5')

			.play();

	// console.log(loaderTl.duration());
}
function hideLoader() {

	var loaderTl = new TimelineMax();
	var barH = $('#loader .bar').height();

	TweenMax.set('article:first .text p', {opacity:0});
	TweenMax.set('#projects-gallery', {className:'+=no-line'});
	TweenMax.set('.slick-dots li', {className:'+=hidden'});
	
	loaderTl
			.to('#loader .bar', 0.5, {width:'52%',ease:Power3.easeOut})
			.to('#loader .bar', 0.5, {width:'100%',ease:Power3.Out})
			.to('#loader .bar', 0.25, {top:-barH,ease:Power3.Out})
			// until here basic loading bar w/ exit
			.set('.grid', {zIndex:'99999'}).set('.grid div', {height:0})
			.to('.grid div', 0.5, {height:'100%',ease:Power3.InOut})
			// draw grid bars
			.set('#loader', {display:'none'})
			.to('.grid div', 0.5, {className:'+=empty'})
			.set('#loader', {display:'none'})
			.set('.grid', {zIndex:'-1'})
			.play();

}
function initGallery() {
	'use strict';

	var content = $('#projects-gallery'),
		beforeChangeTl = new TimelineMax({paused:true}),
		afterChangeTl = new TimelineMax({paused:true}),
		slide, slideNext, texts, textsNext;

	content.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		autoplay: false,
		speed: 2000,
        dots: true,
        appendDots: $('.dots-container')
	});


	content.on('afterChange', function(event, slick, currentSlide){
		slide = $('.slide:eq('+currentSlide+')');
		texts = slide.find('.text p');

		afterChangeTl
			.to('.outer-title h3', 0.5, {y:0,ease:Expo.easeOut})
			.staggerFromTo(texts, 0.5, {opacity:0}, {opacity:1, ease:Expo.easeIn}, 0.15)
			.play();
	});

	content.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		slide = $('.slide:eq('+currentSlide+')');
		slideNext = $('.slide:eq('+nextSlide+')');
		texts = slide.find('p');
		textsNext = slideNext.find('h3, p');

		beforeChangeTl
			.set([slideNext, textsNext], {opacity:0})
			.to('.outer-title h3', 0.5, {y:200,ease:Expo.easeIn})
			.staggerTo(texts, 0.5, {opacity:0, ease:Expo.easeIn}, 0.15)
			.play();
	});
}
function initHomePage() {
	$('#projects-gallery article').find('h3').wrap('<div class="outer-title"></div>');
	outerTitleAnim();
	initGallery();
}
function outerTitleAnim() {
	'use strict';
	var outerTTtl = new TimelineMax();
	outerTTtl.set('.outer-title > *', {y:500})
		.to('.outer-title > *', 0.7, {y:0, ease: Expo.easeOut}, '+=1')
		.play();
}

var Navigation = {
	init: function() {
		'use strict';
		TweenMax.set('#menu', {display:'none'});
		this.bindEvents();
	}, 
	open: function() {
		'use strict';
		var openMenuTl = new TimelineMax({paused: true});
		
		if ( $('main.home').length ) {
			openMenuTl
				.set('#menu', {display:'block'})
				.set('#projects-gallery', {className:'+=no-line'})
				.staggerFromTo('#menu a', 0.5, {y:50,opacity:0}, {y:0,opacity:1, ease:Expo.easeOut}, 0.1)
				.to('#projects-gallery article > *, .gallery-title, .dots-container', 0.5, {opacity:0,ease:Expo.easeOut}, '-=0.5')
				.to('#projects-gallery', 1, {opacity:0.4, ease:Expo.easeOut}, '-=0.5')
				.play();
		} else {
			openMenuTl
				.set('#menu', {display:'block'})
				.to('main > *', 0.5, {opacity:0,ease:Expo.easeOut})
				.staggerFromTo('#menu a', 0.5, {y:50,opacity:0}, {y:0,opacity:1, ease:Expo.easeOut}, 0.1)
				.play();
		}
	},
	close: function() {
		'use strict';
		var closeMenuTl = new TimelineMax({paused: true});
		if ( $('main.home').length ) {
			closeMenuTl
				.set('#projects-gallery', {className:'-=no-line'})
				.staggerFromTo('#menu a', 0.5, {y:0,opacity:1}, {y:50,opacity:0, ease:Power2.easeIn}, -0.1)
				.set('#menu', {display:'none'})
				.to('#projects-gallery article > *, .gallery-title, .dots-container', 0.5, {opacity:1,ease:Expo.easeIn}, '-=0.5')
				.to('#projects-gallery', 1, {opacity:1, ease:Expo.easeOut})
				.play();
		} else {
			closeMenuTl
				.staggerFromTo('#menu a', 0.5, {y:0,opacity:1}, {y:50,opacity:0, ease:Power2.easeIn}, -0.1)
				.to('main > *', 0.5, {opacity:1,ease:Expo.easeIn}, '-=0.5')
				.set('#menu', {display:'none'})
				.play();
		}
	},
	bindEvents: function() {
		'use strict';
		console.log('bindEvents');

		$('body').on('click', '.menu-trigger', function(){
			if ($(this).is('.open')) {
				$('.menu-trigger').removeClass('open');
				Navigation.close();
			} else {
				$('.menu-trigger').addClass('open');
				Navigation.open();
			}
		});
	}
};
// function hideLoader(){
// 	'use strict';
// 	var loaderTl = new TimelineMax();
// 	loaderTl
// 		.set('#loader-wrap .white', {opacity:0})
// 		.to('#loader-wrap', 1, {opacity:0, ease:Power2.easeOut})
// 		.set('#loader-wrap', {display:'none'})
// 		.play();
// }
// function landingAnimLanding() {
// 	'use strict';

// 	var landingTl = new TimelineMax({paused:true});

// 	TweenMax.set('#landing .logo, #landing .text > *, .menu-trigger, .contact-link', {opacity:0});

// 	landingTl
// 		.staggerFromTo('.landing h1, .landing h2', 0.5, {y:50}, {y:0,opacity:1,ease:Power1.easeOut}, 0.2)
// 		.to('h3.logo', 0.5, {opacity:1})
// 		.fromTo('.menu-trigger, .contact-link', 0.5, {y:-20}, {y:0,opacity:1,ease:Power2.easeOut})
// 		.to('a.btn', 0.5, {opacity:1}, "+=0.5");

// 	if ($('body.home').length) {
// 		setTimeout(function(){landingTl.play();}, 3500);
// 	} else {
// 		setTimeout(function(){landingTl.play();}, 1000);
// 	}
// }
// function landingAnimDefault() {
// 	'use strict';

// 	var landingTl = new TimelineMax({paused:true});

// 	TweenMax.set('.left h1, .left p', {opacity:0});
// 	TweenMax.set('.super-title', {css:{opacity:0}, y:-50});

// 	landingTl
// 		.to('.super-title', 1, {y:0,css:{opacity:0.7}, ease:Power1.easeOut})
// 		.staggerTo('.left h1, .left p', 0.5, {opacity:1}, 0.2, "-=0.5");

// 	setTimeout(function(){landingTl.play();}, 1000);
// }
// function superTitleAnim() {
// 	'use strict';
	
// 	var tween = new TweenMax.fromTo('.super-title', 0.25,{css:{opacity:0.7}}, {css:{opacity:0},ease:Linear.easeNone});
// 	var offset = '-' + $('#trigger').css('padding-top');
// 	var duration = $('#trigger').outerHeight() - $(window).height();
	
// 	// console.log(trigger, duration);
	
// 	var superTitleScene = new ScrollMagic.Scene({
// 		triggerElement: '#trigger h1',
// 		triggerHook: 'onLeave',
// 		duration: duration,
// 		offset: offset
// 	}).setTween(tween)
// 	.addTo(controller);
// }
// function setMenu() {
// 	'use strict';

// 	var menuTl = new TimelineMax({paused:true});

// 	if ( !$('.menu-trigger').hasClass('menu-open') ) {
// 		menuTl
// 			.to('.main > *', 0.5, {opacity:0})
// 			.set('.menu-trigger', {className:'+=is-active'}, '-=0.5')
// 			.set('#menu nav li', {y:-30, opacity:0})
// 			.set('#menu .social li', {y:0, opacity:0})
// 			.set('#menu, .menu-trigger, .contact-link', {className:'+=menu-open'})
// 			.to('#menu', 0.75, {opacity:1,ease:Power2.easeInOut})
// 			.staggerTo('#menu nav li', 0.25, {y:0,opacity:1,ease:Power2.easeOut}, 0.1)
// 			.to('#menu .social li', 0.25, {opacity:1,ease:Power2.easeOut}, '+=0.5')
// 			.to('.logo', 0.25, {opacity:1}, '-=0.75')
// 			.play();
// 	} else {
// 		menuTl
// 			.to('#menu nav li, #menu .social li', 0.3, {y:30,opacity:0,ease:Expo.easeIn})
// 			.set('.menu-open', {className:'-=menu-open'})
// 			.set('.menu-trigger', {className:'-=is-active'})
// 			.to('.main > *', 0.5, {opacity:1})
// 			.play();
// 	}
// }


