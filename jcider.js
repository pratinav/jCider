/**    
 * jCider 1.0.0  (http://pratinav.tk/jCider)
 * An extensive and responsive jQuery slider/carousel plugin
 * by PRATINAV BAGLA
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Pratinav Bagla
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 **/

 (function($) {
	$.fn.jcider = function (options) {

		var config = $.extend({
			fading: false,
			easing: 'linear',
			controls: true,
			pagination: true,
			transitionDuration: 400,
			autoplay: false,
			slideDuration: 3000
		}, options);
		var wrapperI = this.index();
		var wrapperName = $(this.parent().children().eq(wrapperI));
		var sliderName = wrapperName.children();
		var slideName = sliderName.children();

		wrapperName.css({
		  'position': 'relative',
		  'overflow': 'hidden'
		});

		if (config.fading) {
			slideName.css({
				'display': 'none',
				'position': 'absolute',
				'top': '0',
				'left': '0'
			});
			sliderName.css('position', 'relative');
			slideName.first().addClass('visible');
			slideName.first().fadeIn(config.transitionDuration);
		} else {
			slideName.css({
			  'float': 'left',
			  'position': 'relative'
			});
			sliderName.css({
			  'left': '0px',
			  'position': 'relative'
			});
	}


		var slideCount = slideName.length;
		var slideWidth, sliderTotalWidth, slideHeight;
		function resize() {
			slideWidth = parseInt(wrapperName.css('width'));
			slideHeight = parseInt(wrapperName.css('height'));
			sliderTotalWidth = slideCount * slideWidth;
			slideName.css({ 'width': slideWidth, 'height': slideHeight});
			if (!config.fading) sliderName.css({ 'width': sliderTotalWidth});
		}
		resize();
		$(window).resize(function() {
			resize();
		});
		if (config.controls)
			wrapperName.prepend('<div class="slider-nav"><span class="nav-left"><</span><span class="nav-right">></span></div>');
		if (config.pagination) {
			wrapperName.after('<div class="pagination"></div>');
			$('.pagination').css({
				'display': 'block',
				'text-align': 'center',
			});
		}

		slideName.each(function() {
			wrapperName.next('.pagination').append('<span class="point"></span>');
		});
		wrapperName.next('.pagination').find('.point').first().addClass('active');

		if (config.autoplay) {
			auto = setInterval(function() {
				if (config.fading) {
					var i = sliderName.find('.visible').index();
					slideName.eq(i).removeClass('visible');
					slideName.eq(i).fadeOut(config.transitionDuration);
					if (i == slideName.length-1) i = -1;
					var m = i+1;
					slideName.eq(m).fadeIn(config.transitionDuration);
					slideName.eq(m).addClass('visible');
					updatePag(m);
				} else {
					if (parseInt(sliderName.css('left')) == (-sliderTotalWidth + slideWidth)) {
						 sliderName.animate({
					            left: '+='+(sliderTotalWidth - slideWidth)
					        }, config.transitionDuration, config.easing);
					} else {
						 sliderName.animate({
				            left: '-='+slideWidth
				        }, config.transitionDuration, config.easing);
					}
					var l = parseInt(sliderName.css('left'))-slideWidth;
					if (-l == sliderTotalWidth) l = 0;
					updatePag(l);
				}
			},config.transitionDuration + config.slideDuration);
		}

		wrapperName.find('.slider-nav .nav-left').click(function() {
				if (config.fading) {
					var i = sliderName.find('.visible').index();
					slideName.eq(i).removeClass('visible');
					slideName.eq(i).fadeOut(config.transitionDuration);
					if (i === 0) i = slideName.length;
					slideName.eq(i-1).fadeIn(config.transitionDuration);
					slideName.eq(i-1).addClass('visible');
				} else {
					$('.slider-nav').css('pointer-events', 'none');
					if (parseInt(sliderName.css('left'))>=0) {
						sliderName.animate({
						    left: '-='+(sliderTotalWidth - slideWidth)
						}, config.transitionDuration, config.easing, function() {
							$('.slider-nav').css('pointer-events', 'all');
						});
					} else {
						sliderName.animate({
						    left: '+='+slideWidth
						}, config.transitionDuration, config.easing, function() {
							$('.slider-nav').css('pointer-events', 'all');
						});
				}
			}
			var l = parseInt(sliderName.css('left'))+slideWidth;
			if (l > 0) l = -(sliderTotalWidth - slideWidth);
			updatePag(l);
		});
		wrapperName.find('.slider-nav .nav-right').click(function() {
			if (config.fading) {
				var i = sliderName.find('.visible').index();
				slideName.eq(i).removeClass('visible');
				slideName.eq(i).fadeOut(config.transitionDuration);
				if (i == slideName.length-1) i = -1;
				slideName.eq(i+1).fadeIn(config.transitionDuration);
				slideName.eq(i+1).addClass('visible');
			} else {
				$('.slider-nav').css('pointer-events', 'none');
				if (parseInt(sliderName.css('left')) == (-sliderTotalWidth + slideWidth)) {
					 sliderName.animate({
				            left: '+='+(sliderTotalWidth - slideWidth)
				        }, config.transitionDuration, config.easing, function() {
				        	$('.slider-nav').css('pointer-events', 'all');
				        });
				} else {
					 sliderName.animate({
			            left: '-='+slideWidth
			        }, config.transitionDuration, config.easing, function() {
				        	$('.slider-nav').css('pointer-events', 'all');
				        });
				}
			}
			var l = parseInt(sliderName.css('left'))-slideWidth;
			if (-l == sliderTotalWidth) l = 0;
			updatePag(l);
		});

		wrapperName.next('.pagination').find('.point').click(function() {
			var i = $(this).index();
			if (config.fading) {
				var x = sliderName.find('.visible').index();
				slideName.eq(x).removeClass('visible');
				slideName.eq(x).fadeOut(config.transitionDuration);
				slideName.eq(i).fadeIn(config.transitionDuration);
				slideName.eq(i).addClass('visible');
			} else {
				$('.slider-nav').css('pointer-events', 'none');
				sliderName.animate({
		            left: i*(-slideWidth)
		        }, config.transitionDuration, function() {
		        	$('.slider-nav').css('pointer-events', 'all');
		        });
			}
	        updatePag(i*-slideWidth);
		});
		function updatePag(l) {
			var i;
			if (config.fading) {
				i = sliderName.find('.visible').index();
			} else i = l/-slideWidth;
			wrapperName.next('.pagination').find('.point').removeClass('active');
			wrapperName.next('.pagination').find('.point').eq(i).addClass('active');
		}
	};
})(jQuery);