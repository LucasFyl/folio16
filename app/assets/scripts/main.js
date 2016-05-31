/*jshint -W117 */
/*jslint latedef:false*/
/* jshint unused:false */
var isMobile = false; //initiate as false
var controller = new ScrollMagic.Controller();


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
		initOtherProjects();
	} else {
		hideLoader();
	}

	if($('main.case-study').length) {
		$('body').addClass('unlocked');
		initScrollAnimations();
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
		autoplay: true,
  		autoplaySpeed: 4000,
		speed: 3000,
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

	var article = content.find('article');
	article.each(function(index, value){
		$(value)
			.hover(
				function(){
					var overlay = $(this).children('.overlay'),
					btns = overlay.children('.btn')

					TweenMax.to(overlay, 1, {visibility:'visible', opacity:1, ease: Power3.easeInOut});
					TweenMax.staggerTo(btns, 1, {bottom:'15.8rem', opacity:1, ease: Power3.easeInOut});
				}, function() {
					var overlay = $(this).children('.overlay'),
					btns = overlay.children('.btn')

					TweenMax.to(overlay, 1, {opacity:0, ease: Power3.easeInOut});
					TweenMax.staggerTo(btns, 1, {bottom:0, opacity:0, ease: Power3.easeInOut});

				}
			);
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
				.to('main, .landing, .blockprevnext', 0.5, {className:'+=op0',ease:Expo.easeOut})
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
				.to('main, .landing, .blockprevnext', 0.5, {className:'-=op0',ease:Expo.easeIn}, '-=0.5')
				.set('#menu', {display:'none'})
				.play();
		}
	},
	bindEvents: function() {
		'use strict';

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
function initScrollAnimations() {
	'use strict';
	TweenMax.set('.nextprev', {opacity:0});

	var el = $('main .gallery > img');
	el.each(function(index, value){
		var tween = TweenMax.fromTo(value, 0.75, {y:50, opaciy:0}, {y:0, opacity:1, ease:Expo.easeOut});
		var projectScene = new ScrollMagic.Scene({
		  triggerElement: value,
		  triggerHook: 'onEnter',
		  offset: 100
		}).addTo(controller)
		.setTween(tween);
	});

	var landing = $('.landing'),
        splashTween = TweenMax.to(landing, 0.25, {opacity:0,ease:Linear.easeNone});
    var splashScene = new ScrollMagic.Scene({
          triggerElement: 'main',
          triggerHook: 0.5,
          duration: '50%'
        }).addTo(controller)
        .setTween(splashTween);

	var landing1 = $('.landing div'),
        splashTween1 = TweenMax.fromTo(landing1, 0.5, {opacity:1}, {opacity:0, ease:Expo.easeOut});
    var splashScene1 = new ScrollMagic.Scene({
          triggerElement: 'main',
          triggerHook: 0.5
        }).addTo(controller)
        .setTween(splashTween1);

    $('.gallery').find('img:last').addClass('last');
	var tweenNP = new TweenMax.to('.nextprev', 0.1, {opacity:1})
	var nextPrev = new ScrollMagic.Scene({
		triggerElement: "img.last", 
		triggerHook: 'onEnter',
		offset: 200
	}).addTo(controller)
    .setTween(tweenNP);
}
function initOtherProjects() {
	'use strict';

	$(window).on('scroll', function(){
		if ( $(window).scrollTop() === 0 ) {
			TweenMax.set('#projects-gallery', {className:'-=no-line', delay:0.5})
		}
	});
	$('body').on('click', '.other', function(e){
		e.preventDefault();
		var vh100 = $(window).height();
		TweenMax.to(window, 1, {scrollTo:{y:vh100},ease:Power3.easeOut});
	});


	var hideLineT = new TweenMax.set('#projects-gallery', {className:'+=no-line'});
	var hideLineS = new ScrollMagic.Scene({
		triggerElement: '.gallery-title',
		triggerHook: 'onLeave'
	}).addTo(controller)
	.setTween(hideLineT);


	var el = $('.other-projects article');
	el.each(function(index, value){
		var tween = TweenMax.fromTo(value, 1.5, {y:80, opaciy:0}, {y:0, opacity:1, ease:Expo.easeOut});
		var projectScene = new ScrollMagic.Scene({
		  triggerElement: value,
		  triggerHook: 'onEnter',
		  offset: 30
		}).addTo(controller)
		.setTween(tween);
	});

	var hideMainT = new TweenMax.to('main', 1, {opacity:0,ease:Linear.easeNone});
	var hideMainS = new ScrollMagic.Scene({
		triggerElement: 'main',
		triggerHook: 'onLeave',
		duration: $(window).height()
	}).addTo(controller)
	.setTween(hideMainT);
}