/*!====================================================
 * jCider 3.0.2  (http://pratinav.tk/jCider)
 *=====================================================
 * @author: Pratinav Bagla (http://pratinav.tk)
 * @license: The MIT License (https://github.com/Pratinav/jCider/blob/master/LICENSE.txt)
 *=====================================================*/
/*
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
			looping: true, // For looping
			visibleSlides: 1, // Visible no. of slides
			variableWidth: false, // For variable width
			variableHeight: true, // For variable height
			fading: false, // For fading/sliding effect
			easing: 'ease-in-out', // For easing
			transitionDuration: 400, // Duration of slide transition
			autoplay: false, // Duh...
			slideDuration: 3000, // Duration between each slide change in autoplay
			controls: true, // For visibility of nav-arrows
			controlsWrapper: 'div.jcider-nav', // Element for nav wrapper
			controlsLeft: ['span.jcider-nav-left', ''], // Element for nav-left 
			controlsRight: ['span.jcider-nav-right', ''], // Element for nav-right
			pagination: true, // For visibility of pagination
			paginationWrapper: 'div.jcider-pagination', // Element for pagination wrapper
			paginationPoint: 'div.jcider-pagination-point' // Element for pagination points
		}, options);

		return this.each(function(){

			// Detect browser
			if(!$.browser){

				$.browser = {};
				$.browser.mozilla = false;
				$.browser.webkit = false;
				$.browser.opera = false;
				$.browser.safari = false;
				$.browser.chrome = false;
				$.browser.msie = false;
				$.browser.android = false;
				$.browser.blackberry = false;
				$.browser.ios = false;
				$.browser.operaMobile = false;
				$.browser.windowsMobile = false;
				$.browser.mobile = false;

				var nAgt = navigator.userAgent;
				$.browser.ua = nAgt;

				$.browser.name  = navigator.appName;
				$.browser.fullVersion  = ''+parseFloat(navigator.appVersion);
				$.browser.majorVersion = parseInt(navigator.appVersion,10);
				var nameOffset,verOffset,ix;

			// In Opera, the true version is after "Opera" or after "Version"
				if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
					$.browser.opera = true;
					$.browser.name = "Opera";
					$.browser.fullVersion = nAgt.substring(verOffset+6);
					if ((verOffset=nAgt.indexOf("Version"))!=-1)
						$.browser.fullVersion = nAgt.substring(verOffset+8);
				}

			// In MSIE < 11, the true version is after "MSIE" in userAgent
				else if ( (verOffset=nAgt.indexOf("MSIE"))!=-1) {
					$.browser.msie = true;
					$.browser.name = "Microsoft Internet Explorer";
					$.browser.fullVersion = nAgt.substring(verOffset+5);
				}

			// In TRIDENT (IE11) => 11, the true version is after "rv:" in userAgent
				else if (nAgt.indexOf("Trident")!=-1 ) {
					$.browser.msie = true;
					$.browser.name = "Microsoft Internet Explorer";
					var start = nAgt.indexOf("rv:")+3;
					var end = start+4;
					$.browser.fullVersion = nAgt.substring(start,end);
				}

			// In Chrome, the true version is after "Chrome"
				else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
					$.browser.webkit = true;
					$.browser.chrome = true;
					$.browser.name = "Chrome";
					$.browser.fullVersion = nAgt.substring(verOffset+7);
				}
			// In Safari, the true version is after "Safari" or after "Version"
				else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
					$.browser.webkit = true;
					$.browser.safari = true;
					$.browser.name = "Safari";
					$.browser.fullVersion = nAgt.substring(verOffset+7);
					if ((verOffset=nAgt.indexOf("Version"))!=-1)
						$.browser.fullVersion = nAgt.substring(verOffset+8);
				}
			// In Safari, the true version is after "Safari" or after "Version"
				else if ((verOffset=nAgt.indexOf("AppleWebkit"))!=-1) {
					$.browser.webkit = true;
					$.browser.name = "Safari";
					$.browser.fullVersion = nAgt.substring(verOffset+7);
					if ((verOffset=nAgt.indexOf("Version"))!=-1)
						$.browser.fullVersion = nAgt.substring(verOffset+8);
				}
			// In Firefox, the true version is after "Firefox"
				else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
					$.browser.mozilla = true;
					$.browser.name = "Firefox";
					$.browser.fullVersion = nAgt.substring(verOffset+8);
				}
			// In most other browsers, "name/version" is at the end of userAgent
				else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ){
					$.browser.name = nAgt.substring(nameOffset,verOffset);
					$.browser.fullVersion = nAgt.substring(verOffset+1);
					if ($.browser.name.toLowerCase()==$.browser.name.toUpperCase()) {
						$.browser.name = navigator.appName;
					}
				}

				/*Check all mobile environments*/
				$.browser.android = (/Android/i).test(nAgt);
				$.browser.blackberry = (/BlackBerry/i).test(nAgt);
				$.browser.ios = (/iPhone|iPad|iPod/i).test(nAgt);
				$.browser.operaMobile = (/Opera Mini/i).test(nAgt);
				$.browser.windowsMobile = (/IEMobile/i).test(nAgt);
				$.browser.mobile = $.browser.android || $.browser.blackberry || $.browser.ios || $.browser.windowsMobile || $.browser.operaMobile;


			// trim the fullVersion string at semicolon/space if present
				if ((ix=$.browser.fullVersion.indexOf(";"))!=-1)
					$.browser.fullVersion=$.browser.fullVersion.substring(0,ix);
				if ((ix=$.browser.fullVersion.indexOf(" "))!=-1)
					$.browser.fullVersion=$.browser.fullVersion.substring(0,ix);

				$.browser.majorVersion = parseInt(''+$.browser.fullVersion,10);
				if (isNaN($.browser.majorVersion)) {
					$.browser.fullVersion  = ''+parseFloat(navigator.appVersion);
					$.browser.majorVersion = parseInt(navigator.appVersion,10);
				}
				$.browser.version = $.browser.majorVersion;
			}

			function getElementString(arr, content) {
				if (content===undefined) {
					content = '';
				}
				var el = '<'+arr[0]+' class=\"';
				for (var x = 1; x < arr.length; x++) {
					el += arr[x];
					if (x!==arr.length-1) el += ' ';
				}
				el+='\">'+content+'</'+arr[0]+'>';
				return el;
			}

			var $wrapper = $(this),
				$slideWrap = $wrapper.children(),
				$slides = $slideWrap.children(),
				slideCount = $slides.length,
				$controls,
				$controlsLeft,
				$controlsRight,
				$pagination,
				$paginationPoints,
				$current,
				currentWidth,
				currentHeight,
				initPos = false,
				fallback = false,
				pause = false,
				offset = 0;

			if ((($.browser.msie || $.browser.mozilla) && $.browser.version < 10) || ($.browser.chrome && $.browser.version < 12) || ($.browser.safari && $.browser.version < 3.2) || ($.browser.opera && $.browser.version < 15) || ($.browser.operaMobile && $.browser.version < 30) || ($.browser.android && $.browser.version < 3)) {
				fallback = true;
			}

			$wrapper.css({
				'position': 'relative',
				'overflow': 'hidden',
				'transition': 'all '+config.transitionDuration+'ms',
			});

			$slideWrap.css({
				'position': 'relative',
				'height': '100%'
			});

			if (config.fading) {
				$slideWrap.css({
					'width': '100%'
				});
				$slides.css({
					'position': 'absolute'
				}).not(0).fadeOut();
			} else {
				$slideWrap.css({
					'width': calcWidth()+'px',
					'transition': 'all '+config.transitionDuration+'ms '+config.easing,
					'left': '0',
					'transform': 'translate3d(0,0,0)',
					'cursor': 'move'
				});

				$slides.css({
					'display': 'inline-block',
					'float': 'left'
				});
			}

			function calcWidth() {
				var width = 0;
				for (var x = 0; x < slideCount; x++) {
					width+= $slides.eq(x).outerWidth(true);
				}
				return width;
			}

			function calcOff(index) {
				var $el = $slides.eq(index),
					offset = $el.offset().left,
					wrapperOffset = $slideWrap.offset().left;
				return wrapperOffset-offset;
			}


			function initControls() {
				if (config.controls !== true) return;
				var element = config.controlsWrapper.split('.');
				$wrapper.append(getElementString(element));
				$controlsWrapper = $wrapper.find(config.controlsWrapper);
				$controlsWrapper.append(getElementString(config.controlsLeft[0].split('.'), config.controlsLeft[1]));
				$controlsWrapper.append(getElementString(config.controlsRight[0].split('.'), config.controlsRight[1]));
				$controlsLeft = $controlsWrapper.find(config.controlsLeft[0]);
				$controlsRight = $controlsWrapper.find(config.controlsRight[0]);
			}


			function initPagination() {
				if (config.pagination !== true) return;
				var pagWrap = getElementString(config.paginationWrapper.split('.'));
				$wrapper.append(pagWrap);
				$pagination = $wrapper.find(config.paginationWrapper);
				var pagPoint = getElementString(config.paginationPoint.split('.'));
				for (var x = 0; x < Math.ceil(slideCount/config.visibleSlides); x++) {
					$pagination.append(pagPoint);
				}
				$paginationPoints = $pagination.children(config.paginationPoint);
			}


			function moveTo(index) {
				if (!config.looping) {
					if (index > slideCount-1 || index < 0) {
						return;
					}

					if ($controlsLeft.hasClass('disabled')) {
						$controlsLeft.removeClass('disabled');
					}
					if ($controlsRight.hasClass('disabled')) {
						$controlsRight.removeClass('disabled');
					}

					if (index === 0) {
						$controlsLeft.addClass('disabled');
					} else if(index===slideCount-1) {
						$controlsRight.addClass('disabled');
					}
				}


				var $prev;
				if (initPos) {
					$prev = $slides.filter('.active');
					if ($prev.index()===index) return;
					$prev.removeClass('active');
					if (config.pagination) {
						$paginationPoints.filter('.active').removeClass('active');
					}
				}
				if (index < 0) {
					index = slideCount-1;
				} else if (index > slideCount-1) {
					index = 0;
				}
				$current = $slides.eq(index);
				if (config.visibleSlides===1) {
					if (config.variableHeight) {
						currentHeight = $current.height();
						$wrapper.css({
							'height': currentHeight+'px'
						});
					}
					if (config.variableWidth) {
						currentWidth = $current.width();
						$wrapper.css({
							'width': currentWidth+'px'
						});
					}
				}
				if (config.pagination) {
					$paginationPoints.eq(index).addClass('active');
				}
				$current.addClass('active');
				if (config.fading) {
					if (initPos) {
						$prev.fadeOut(config.transitionDuration);
					}
					$current.fadeIn(config.transitionDuration);
				} else {
					offset = calcOff(index);
					if (fallback) {
						$slideWrap.css({
							'left': '-'+offset()+'px'
						});
					} else {
						$slideWrap.css({
							'-webkit-transform': 'translate3d('+offset +'px,0, 0)',
							'-moz-transform': 'translate3d('+offset +'px,0, 0)',
							'transform': 'translate3d('+offset +'px,0, 0)'
						});
					}
				}
				if (!initPos) {
					initPos = true;
				}
			}

			function next() {
				moveTo($current.index()+1);
			}

			function prev() {
				moveTo($current.index()-1);
			}

			function play() {
				next();
				if (pause) {
					pause = false;
					return;
				}
				setTimeout(function() {
					play();
				},config.slideDuration);
			}

			function stopPlay() {
				if (!pause) {
					pause = true;
				}
			}

			function togglePlay(){
				if (!pause) {
					pause = true;
				} else {
					pause = false;
					play();
				}
			}

			function init() {
				if (config.controls) {
					initControls();
				}

				if (config.pagination) {
					initPagination();
				}

				moveTo(0);

				if (config.autoplay) {
					play();
				}
			}
			init();

			function hideControls() {
				if (!config.controls) {
					return;
				}
				if ($controlsWrapper.css('display') !== 'none') {
					$controlsWrapper.hide();
				}
			}

			function showControls() {
				if (!config.controls) {
					return;
				}
				if ($controlsWrapper.css('display') === 'none') {
					$controlsWrapper.show();
				}
			}

			function toggleControls() {
				if (!config.controls) {
					return;
				}
				if ($controlsWrapper.css('display') !== 'none') {
					$controlsWrapper.hide();
				} else {
					$controlsWrapper.show();
				}
			}

			function hidePagination() {
				if (!config.pagination) {
					return;
				}
				if ($pagination.css('display') !== 'none') {
					$pagination.hide();
				}
			}

			function showPagination() {
				if (!config.pagination) {
					return;
				}
				if ($pagination.css('display') === 'none') {
					$pagination.show();
				}
			}

			function togglePagination() {
				if (!config.pagination) {
					return;
				}
				if ($pagination.css('display') !== 'none') {
					$pagination.hide();
				} else {
					$pagination.show();
				}
			}

			$paginationPoints.on('click', function(e) {
				e.stopPropagation();
				var index = $(this).index();
				moveTo(index);
				return false;
			});

			$controlsLeft.on('click', function(e) {
				e.stopPropagation();
				prev();
				return false;
			});

			$controlsRight.on('click', function(e) {
				e.stopPropagation();
				next();
				return false;
			});

			var mouseDown = false,
				mouseMove = false,
				mouseStart = 0,
				touchStartY = 0,
				mouseX = 0;
			$wrapper.on({
				'mousedown': function(e) {
					mouseDown = true;
					if ($.browser.msie) {
						mouseStart = event.clientX + document.body.scrollLeft;
					} else {
						mouseStart = e.pageX;
					}
				},
				'mouseup': function(e) {
					if (!mouseMove) {
						return;
					}
					mouseDown = false;
					mouseMove = false;
					if (mouseStart > mouseX+20) {
						next();
					} else if (mouseStart < mouseX-20) {
						prev();
					}
				},
				'mousemove': function(e) {
					if (!mouseDown) return;
					mouseMove = true;
					if ($.browser.msie) {
						mouseX = event.clientX + document.body.scrollLeft;
					} else {
						mouseX = e.pageX;
					}
				},
				'touchstart': function(e) {
					touchStartY = e.originalEvent.touches[0].clientY;
				},
				'touchend': function(e) {
					var touchEndY = e.originalEvent.changedTouches[0].clientY;
					if(touchStartY > touchEndY+10) next();
					else if(touchStartY < touchEndY-10) prev();
				},
				'touchmove': function(e) {
					if(e.preventDefault) { e.preventDefault(); }
				}
			});

			$.fn.jcider.moveTo = moveTo;
			$.fn.jcider.moveRight = next;
			$.fn.jcider.moveLeft = prev;
			$.fn.jcider.play = play;
			$.fn.jcider.pause = stopPlay;
			$.fn.jcider.togglePlay = togglePlay;
			$.fn.jcider.hidePagination = hidePagination;
			$.fn.jcider.showPagination = showPagination;
			$.fn.jcider.togglePagination = togglePagination;
			$.fn.jcider.hideControls = hideControls;
			$.fn.jcider.showControls = showControls;
			$.fn.jcider.toggleControls = toggleControls;

		});

	};

})(jQuery);
