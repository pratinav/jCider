/*!
 *         _ ______    __
 *        (_) ___(_)__/ /__ ____
 *       / / /__/ / _  / -_) __/
 *    __/ /\___/_/\_,_/\__/_/
 *   |___/
 *
 * jCider 3.0.1  (http://pratinav.tk/jCider)
 * @author: Pratinav Bagla (http://pratinav.tk)
 * @license: The MIT License (MIT)
 **//*
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

(function($){

	$.fn.jcider = function (options) {

		// Declare all options.
		var config = $.extend({
			visibleSlides: 1, // Visible no. of slides
			fading: false, // For fading/sliding effect
			easing: 'ease-in-out', // For easing
			controls: true, // For visibility of nav-arrows
			pagination: true, // For visibility of pagination
			transitionDuration: 400, // Duration of slide transition
			autoplay: false, // Duh...
			slideDuration: 3000 // Duration between each slide change in autoplay
		}, options);

		return this.each(function(){

			var wrapper = $(this),
				slider = wrapper.children(),
				slide = slider.children(),
				slideCount = slide.length,
				slideWidth = wrapper.width()/config.visibleSlides,
				slideHeight = wrapper.height(),
				sliderWidth = slideWidth * slideCount;

			wrapper.css({
				'position': 'relative',
				'overflow': 'hidden'
			});

			slider.css({
				'position': 'relative',
				'height': slideHeight+'px',
				'left': '0px',
				'transition': 'left '+config.transitionDuration+'ms '+config.easing
			});
			slider.addClass('jcider-slider');

			if (config.fading) {
				slider.css({
					'width': wrapper.width()+'px',
				});

				slide.css({
					'display': 'none',
					'position': 'absolute',
					'top': '0',
					'left': '0'
				});

				slide.first().fadeIn().addClass('active');
			} else {
				slider.css({
					'width': sliderWidth+'px',
				});

				slide.css({
					'float': 'left',
				});

				slide.first().addClass('active');

			}
			function resize() {
				slideWidth = wrapper.width()/config.visibleSlides;
				slideHeight = wrapper.height();
				sliderWidth = slideWidth * slideCount;

				slider.css({'height': slideHeight+'px', 'left': '0px'});
				if (config.fading) {
					slider.css('width', wrapper.width()+'px');
				} else {
					slider.css('width', sliderWidth+'px');
				}

				slide.css({
					'height': slideHeight+'px',
					'width': slideWidth+'px'
				});
			}
			resize();
			$(window).resize(function() {
				resize();
			});

			if (config.controls)
				wrapper.prepend('<div class="slider-nav"><span class="nav-left icon-chevron-left"></span><span class="nav-right icon-chevron-right"></span></div>');

			if (config.pagination) {
				wrapper.append('<div class="jcider-pagination"></div>');

				for (x = 0; x < Math.ceil(slideCount/config.visibleSlides); x++) {
					wrapper.find('.jcider-pagination').append('<span class="point"></span>');
				}

				wrapper.find('.jcider-pagination').find('.point').first().addClass('active');
			}

			function updatePagination() {
				var slideIndex = slider.find('.active').index(),
					activePag = wrapper.find('.jcider-pagination').find('.active');
				activePag.removeClass('active');
				var newIndex = Math.floor(slideIndex/config.visibleSlides);
				if (slideCount%2!==0 && slideIndex === slideCount-config.visibleSlides)
					newIndex = Math.ceil(slideIndex/config.visibleSlides);
				wrapper.find('.jcider-pagination').children().eq(newIndex).addClass('active');
			}

			function slideNext() {
				var index = slider.find('.active').index();

				slide.eq(index).removeClass('active');
				if (index!==slideCount-1 && -index*slideWidth > -(sliderWidth-config.visibleSlides*slideWidth)) {
					slider.css('left', -(index+1)*slideWidth+'px');
					slide.eq(index+1).addClass('active');
				} else {
					slider.css('left', '0px');
					slide.eq(0).addClass('active');
				}
			}

			function slidePrev() {
				var index = slider.find('.active').index();

				slide.eq(index).removeClass('active');
				if (index!==0) {
					slider.css('left', -(index-1)*slideWidth+'px');
					slide.eq(index-1).addClass('active');
				} else {
					slider.css('left', -(sliderWidth-config.visibleSlides*slideWidth)+'px');
					slide.eq(slideCount-config.visibleSlides).addClass('active');
				}
			}

			function fadeNext() {
				var index = slider.find('.active').index();
				slide.eq(index).removeClass('active');
				slide.eq(index).fadeOut(config.transitionDuration);
				if (index === slideCount-1) index = -1;
				slide.eq(index+1).fadeIn(config.transitionDuration);
				slide.eq(index+1).addClass('active');
			}

			function fadePrev() {
				var index = slider.find('.active').index();
				slide.eq(index).removeClass('active');
				slide.eq(index).fadeOut(config.transitionDuration);
				if (index === 1) index = slideCount;
				slide.eq(index-1).fadeIn(config.transitionDuration);
				slide.eq(index-1).addClass('active');
			}

			function slidePagination(pag) {
				var index = pag.index()*(config.visibleSlides),
					current = slider.find('.active');

				if (slideCount%2!==0 && pag.index() === Math.floor(slideCount/config.visibleSlides))
					index = slideCount-config.visibleSlides;
				current.removeClass('active');
				slider.css('left', -(index)*slideWidth+'px');
				slide.eq(index).addClass('active');
			}

			function fadePagination(pag) {
				var index = pag.index()*(config.visibleSlides),
					current = slider.find('.active');

				current.removeClass('active');
				current.fadeOut(config.transitionDuration);
				slide.eq(index).fadeIn(config.transitionDuration);
				slide.eq(index).addClass('active');
			}

			if (config.autoplay) {
				setInterval(function() {
					if (config.fading) fadeNext();
					else slideNext();
					updatePagination();
				}, config.slideDuration);
			}

			wrapper.find('.nav-right').click(function() {
				if (config.fading) fadeNext();
				else slideNext();
				updatePagination();
			});

			wrapper.find('.nav-left').click(function() {
				if (config.fading) fadePrev();
				else slidePrev();
				updatePagination();
			});

			slide.on('swipeleft', function() {
				if (config.fading) fadeNext();
				else slideNext();
				updatePagination();
			});

			slide.on('swiperight', function() {
				if (config.fading) fadePrev();
				else slidePrev();
				updatePagination();
			});

			wrapper.find('.jcider-pagination').find('.point').click(function() {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
				if (config.fading) fadePagination($(this));
				else slidePagination($(this));
			});

		});

	};

})(jQuery);
