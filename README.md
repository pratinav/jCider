# [jCider](https://pratinav.xyz/jCider/)

An extensive and responsive jQuery carousel plugin that will slide your world.


## Installation

Link `jcider.css`, [`jQuery`](https://jquery.com) and `jcider.min.js` in your `html` file, using the CDN or otherwise.


```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.jcider/latest/jcider.css"/>
<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.jcider/latest/jcider.min.js"></script>
```


### Package Managers

`bower install --save jcider`

`npm install --save jcider`


## Usage

### HTML

The carousel uses a 3 layer structure in the HTML document.

```
<div class="slider">
	<ul>
		<li>First Slide</li>
		<li>Second Slide</li>
		<li>Third Slide</li>
	</ul>
</div>
```

All your content for each slide should go inside the innermost elements, as illustrated above.

_For the rest of the docs we will refer to the outermost element as the **wrapper**, the middle element as the **slider** and the innermost elements as the **slides**._


### CSS

The styles in the `jcider.css` file are the default styles that come with the plugin. You can customize the appearence and positioning as per your convinience in the `jcider.css` file. Please refer to the file for information on the selectors.


### JS

```
$(document).ready(function(){
	// Make sure to call jcider on the wrapper (outermost) element
	$('yourWrapperElementHere').jcider();
});
```


### Settings

You can pass in multiple options as arguments for the ```.jcider()``` function.

```
$('yourWrapperElementHere').jcider({
	looping: true, // For looping
	visibleSlides: 1, // Visible no. of slides
	variableWidth: false, // For variable width
	variableHeight: true, // For variable height
	fading: false, // For fading/sliding effect
	easing: 'cubic-bezier(.694, .0482, .335, 1)', // For easing
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
});
```

| Setting Name | Type | Description | Default |
|--------------|-------|-------------|---------|
| looping | boolean | Selects if looping is there or not. | true |
| visibleSlides | integer | Selects the number of slides visble at a time. | 1 |
| variableWidth | boolean | Selects if the wrapper should resize with the slide width or not. | false |
| variableHeight | boolean | Selects if the wrapper should resize with the slide height or not. | true |
| fading | boolean | Selects the type of transition. true is fading. `false` is sliding. | false |
| easing | string | Selects the type of easing to be used for CSS animations. | 'cubic-bezier(.694, .0482, .335, 1)' |
| transitionDuration | integer | The duration taken to transition from one slide to another, in milliseconds. | 400 |
| autoplay | boolean | Chooses whether automatic transition between slides is on or off. `true` is on. | false |
| slideDuration | integer | The duration between change of slides, in milliseconds. Only applicable if autoplay is on. | 3000 |
| controls | boolean | Chooses whether the navigation controls are visible or not. `true` is visible. | true |
| controlsWrapper | string | Selector for the nav-wrapper. Element followed by an optional id or multiple classes. Multiple classes must be separated by periods. | 'div.jcider-nav' |
| controlsLeft | array > string * 2 | Selector for left button for nav. Array containing two strings. The first string is the Element followed by an optional id or multiple classes. Multiple classes must be separated by periods. The second string is optional content. | ['span.jcider-nav-left', ''] |
| controlsRight | array > string * 2 | Selector for right button for nav. Array containing two strings. The first string is the Element followed by an optional id or multiple classes. Multiple classes must be separated by periods.  | ['span.jcider-nav-right', ''] |
| pagination | boolean | Chooses whether the pagination is visible or not. `true` is visible. | true |
| paginationWrapper | string | Selector for pagination-wrapper. Element followed by an optional id or multiple classes. Multiple classes must be separated by periods. | 'div.jcider-pagination' |
| paginationPoints | string | Selector for pagination-points. Element followed by an optional id or multiple classes. Multiple classes must be separated by periods. | 'span.jcider-pagination-point' |


### Using Multiple carousels in one page

You can use multiple carousels in one page with ease. There may be two or more sliders with the same class.


For example, your `html` would be-

```
<div class="slider">
	<ul>
		<li>First Slide.</li>
		<li>Second Slide.</li>
		<li>Third Slide.</li>
	</ul>
</div>

<div class="slider">
	<ul>
		<li>First slide.</li>
		<li>Second slide.</li>
		<li>Third slide.</li>
	</ul>
</div>

<div class="another-slider">
	<ul>
		<li>First Slide.</li>
		<li>Second Slide.</li>
		<li>Third Slide.</li>
	</ul>
</div>

<div class="another-slider">
	<ul>
		<li>First Slide.</li>
		<li>Second Slide.</li>
		<li>Third Slide.</li>
	</ul>
</div>
```

Your `JS`would be-

```
$('.slider').jcider();
$('.another-slider').jcider();
```


## Functions

### `jcider.moveLeft()`

Transition towards the left.

```
$(document).ready(function() {
	$('# main').jcider({
		//Some options
	});

	$('button#left').click(function() {
		$('# main').jcider.moveLeft();
	});
});
```


### `jcider.moveRight()`

Transition towards the right.

```
$(document).ready(function() {
	$('# main').jcider({
		//Some options
	});

	$('button# right').click(function() {
		$('# main').jcider.moveRight();
	});
});
```


### `jcider.moveTo(index)`

Transition to slide at `index` (starting from 0).

```
$(document).ready(function() {
	$('# main').jcider({
		//Some options
	});

	$('button# home').click(function() {
		$('# main').jcider.moveTo(0);
	});
});
```


### `jcider.play()`

Enable autoplay.

```
$(document).ready(function() {
	$('# main').jcider({
		//Some options
	});

	$('button# play').click(function() {
		$('# main').jcider.play();
	});
});
```


### `jcider.pause()`

Disable autoplay.

```
$(document).ready(function() {
	$('# main').jcider({
		//Some options
	});

	$('button# pause').click(function() {
		$('# main').jcider.pause();
	});
});
```


### `jcider.togglePlay()`

Toggle autoplay.

```
$(document).ready(function() {
	$('# main').jcider({
		//Some options
	});

	$('button# toggle').click(function() {
		$('# main').jcider.togglePlay();
	});
});
```


### `jcider.hideControls()`

Hide controls.

```
$(document).ready(function() {
	$('# main').jcider({
		//Some options
	});

	$('button# hide').click(function() {
		$('# main').jcider.hideControls();
	});
});
```


### `jcider.showControls()`

Show controls.

```
$(document).ready(function() {
	$('# main').jcider({
		//Some options
	});

	$('button# show').click(function() {
		$('# main').jcider.showControls();
	});
});
```


### `jcider.toggleControls()`

Toggle controls.

```
$(document).ready(function() {
	$('# main').jcider({
		//Some options
	});

	$('button# show').click(function() {
		$('# main').jcider.showControls();
	});
});
```


### `jcider.hidePagination()`

Hide pagination.

```
$(document).ready(function() {
	$('# main').jcider({
		//Some options
	});

	$('button# hide').click(function() {
		$('# main').jcider.hidePagination();
	});
});
```


### `jcider.showPagination()`

Show pagination.

```
$(document).ready(function() {
	$('# main').jcider({
		//Some options
	});

	$('button# show').click(function() {
		$('# main').jcider.showPagination();
	});
});
```


### `jcider.togglePagination()`

Toggle pagination.

```
$(document).ready(function() {
	$('# main').jcider({
		//Some options
	});

	$('button# show').click(function() {
		$('# main').jcider.togglePagination();
	});
});
```


This content is released under [The MIT License](http://github.com/Pratinav/jCider/blob/master/LICENSE.txt).
