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

	if($('main.small-project').length) {
		Modal.init();
		LightBox.init();
	}
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
			.set('.grid', {zIndex:'99999'}).set('.grid div', {height:0,onComplete:function(){
				// Prepare outer-title el for animation 
				$('#projects-gallery article').find('h3').wrap('<div class="outer-title"></div>');
				TweenMax.set('article:first .outer-title > *', {y:500});
				// init gallery when done
				setTimeout(function(){
					initGallery();
				}, 200);
			}})
			.to('.grid div', 1, {height:'100%',ease:Power3.InOut})
			// draw grid bars
			.set('#loader', {display:'none'})
			.to('.grid div', 0.5, {className:'+=empty'})
			.set('.grid', {zIndex:'-1'})
			// // hide loader and reset grid bars zIndex
			.set('#projects-gallery', {className:'-=no-line',onComplete:function(){
				outerTitleAnim();
			}})
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

	var projectsGallery = $('#projects-gallery'),
		slide, slideTitle, slideNext, slideNextTitle, slideTexts, slideNextTexts,
		title = '.outer-title h3';

	projectsGallery.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
  		autoplaySpeed: 6000,
		speed: 1000,
        dots: true,
        appendDots: $('.dots-container'),
        pauseOnDotsHover: true
	});

	projectsGallery.on('afterChange', function(event, slick, currentSlide){
		slide = $('.slick-current');
		slideTitle = slide.find('h3').selector;
		slideTexts = slide.find('p').selector;

		// animate slide content back into place
		TweenMax.staggerTo(slideTitle, 0.5, {transform:'none',ease:Power2.easeOut,}, 0.1);
		TweenMax.staggerTo(slideTexts, 0.5, {opacity:1,ease:Power2.easeOut}, 0.15);
	});

	projectsGallery.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		slide = $('.slick-current');
		slideTitle = slide.find('h3').selector;
		slideTexts = slide.find('p').selector;
		slideNext = slide.next('.slick-slide');
		slideNextTitle = slideNext.find('h3').selector;
		slideNextTexts = slideNext.find('p').selector;

		// Animate slide content to leave + setup next slide content
		TweenMax.to(slideNextTitle, 0.5, {x:'100%',ease:Power2.easeOut});
		TweenMax.to(slideTitle, 0.5, {x:'-100%',ease:Power2.easeOut});
		TweenMax.to(slideTexts, 0.5, {opacity:0,ease:Power2.easeOut});
		TweenMax.set(slideNextTexts, {opacity:0});

		// update dots class
		if (nextSlide <= currentSlide) {
			$('.slick-dots li').removeClass('slick-visited');
		}
		for(var i = 0; i <= nextSlide; i++) {
			$('.slick-dots li').eq(i).addClass('slick-visited');
		}
	});
	

	var article = projectsGallery.find('article');
	article.each(function(index, value){
		$(value).hover(
			function(){
				var overlay = $(this).children('.overlay'),
				btns = overlay.children('.btn');

				TweenMax.to(overlay, 1, {visibility:'visible', opacity:1, ease: Power3.easeInOut});
				TweenMax.staggerTo(btns, 1, {bottom:'5.8rem', opacity:1, ease: Power3.easeInOut});
			}, function() {
				var overlay = $(this).children('.overlay'),
				btns = overlay.children('.btn');

				TweenMax.to(overlay, 1, {opacity:0, ease: Power3.easeInOut});
				TweenMax.staggerTo(btns, 1, {bottom:0, opacity:0, ease: Power3.easeInOut});
			}
		);
	});

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
		openMenuTl
			.set('#projects-gallery', {className:'+=no-line'})
			.set('#menu > *', {opacity:1,y:0})
			.set('.grid', {zIndex:99})
			.to('.grid div', 0.25, {className:'-=empty',ease:Expo.easeOut})
			.set('#menu .id > *, #menu nav > *, #menu nav li', {opacity:0,x:'-20',y:'-20'})
			.set('#menu', {display:'block'})
			.staggerTo('#menu .id > *, #menu nav > *, #menu nav li', 0.15, {opacity:1,x:0,y:0,ease:Expo.easeOut}, 0.05)
			.play();
	},
	close: function() {
		'use strict';
		var closeMenuTl = new TimelineMax({paused: true});
		closeMenuTl
			.to('#menu > *', 0.25, {opacity:0,y:50,ease:Expo.easeIn})
			.to('.grid div', 0.25, {className:'+=empty',ease:Expo.easeOut})
			.set('.grid', {zIndex:'-1',delay:0.5})
			.set('#projects-gallery', {className:'-=no-line'})
			.set('#menu', {display:'none'})
			.play();
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
	if (!isMobile) {
		TweenMax.set('.nextprev', {opacity:0});
	}

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

	if (!isMobile) {
	    $('.gallery').find('img:last').addClass('last');
		var tweenNP = new TweenMax.to('.nextprev', 0.1, {opacity:1});
		var nextPrev = new ScrollMagic.Scene({
			triggerElement: "img.last", 
			triggerHook: 'onEnter',
			offset: 200
		}).addTo(controller)
	    .setTween(tweenNP);
	}
}
function initOtherProjects() {
	'use strict';

	$(window).on('scroll', function(){
		if ( $(window).scrollTop() === 0 ) {
			TweenMax.set('#projects-gallery', {className:'-=no-line', delay:0.5});
			TweenMax.to('main', 1, {opacity:1,ease:Linear.easeNone});
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
var LightBox = {
	init: function() {
		var galleryContent = $('.scroller').html();
		$('body').on('click', '.gallery .scroller > img', function(){
			var imgIndex = $(this).index();
			LightBox.open(imgIndex, galleryContent);
		});
		$('body').on('click', '.closeModal', function(e){
			e.preventDefault();
			LightBox.close();
		});
		$(document).keyup(function(e){
			if(e.which === 27) {
			  	LightBox.close();
			}
		});
	}, 
	open: function(imgIndex, galleryContent) {
		Modal.open();
		var gallery = $('.modal-gallery');
		gallery.append(galleryContent);
		setTimeout(function(){
			gallery.slick({
				slidesToShow: 1,
				arrows: false,
				dots: false,
				fade: true,
				autoplay: false,
				adaptiveHeight: true
			});
			gallery.slick('slickGoTo', imgIndex);
			$('.arrow.prev').on('click', function(){gallery.slick('slickPrev');});
			$('.arrow.next').on('click', function(){gallery.slick('slickNext');});
		}, 200);
	},
	close: function() {
		$('.modal-gallery').slick('unslick').empty();
		$('.controls .prev').off();
		$('.controls .next').off();
	}
};