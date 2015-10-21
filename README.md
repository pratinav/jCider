#[jCider](http://pratinav.tk/jCider)


An extensive and responsive jQuery carousel plugin that will slide your world.


##Contribution and Issues


This plugin is early in development and new features will be added soon. Feel free to contribute by sending in [pull requests](http://github.com/Pratinav/jCider/pulls) and help me improve the plugin by pointing out bugs in the [issues page](http://github.com/Pratinav/jCider/issues).


####Pull Requests


Feel free to send in [pull requests](http://github.com/Pratinav/jCider/pulls) to improve the plugin or add new features. If you want to add a new feature please send in a clear and elaborate description and explanation of the working of it and a [codepen](http://codepen.io) or [jsFiddle](http://jsFiddle.net) demostrating your feature. Your feature has to be compatible with all other features and settings available.


####Issues


Feel free to report any issues/problems with the plugin at [issues page](http://github.com/Pratinav/jCider/issues).


You may send me a mail describing your issue- [pratinavbagla@gmail.com](mailto:pratinavbagla@gmail.com).


**I will try to get to you as fast as possible but may not be able to get to you always.**


##Installation


- Download the files or use the CDN.

- Link the ```jcider.css``` file in your ```head``` tag.

- Link ```jcider.min.js``` in your ```head``` tag or at the end of your ```body``` tag.

**Don't forget to link [jQuery](https://jquery.com) before the jCider file.**


Like this:

```
<link rel="stylesheet" href="PATH_TO_FILE/jcider.css"/>
```

```
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="PATH_TO_FILE/jcider.min.js"></script>
```

**CDN**

```
<link rel="stylesheet" href="//cdn.jsdelivr.net/jquery.jcider/latest/jcider.css"/>
```

```
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/jquery.jcider/latest/jcider.min.js"></script>
```


####Package Managers


For [Bower](http://bower.io)-


```bower install jcider --save```


For [NPM](http://npmjs.com)-


```npm install jcider```


####Styles


The styles in the ```jcider.css``` file are the default styles that come with the plugin. You can customize the appearence and positioning as per your convinience in the ```jcider.css``` file. Please refer to the file for information on the selectors.



##Usage


####HTML


The carousel uses a 3 layer structure in the HTML document. For, example-

```
<div class="slider">
	<ul>
		<li>First Slide</li>
		<li>Second Slide</li>
		<li>Third Slide</li>
	</ul>
</div>
```

This is not limited to any specific elements or Class/ID names. So this too can be used-

```
<div class="another-slider">
	<div>
		<div>First Slide</div>
		<div>Second Slide</div>
		<div>Third Slide</div>
	</div>
</div>
```

All your content for each slide should go inside the innermost elements, as illustrated above.


For the rest of the docs we will refer to the outermost element as the **wrapper**, the middle element as the **slider** and the innermost elements as the **slides**.



####CSS


You can give any styles to any of the elements, as per your choice. The **slider element** is only for the plugin to function, so you do not need to style this element.


You can give any dimensions to the **'slides' (innermost elements)** . If you want a variable width/height slider, You can set variable width/height to `true` in the [settings (more information below)](#advance-usage--settings) .


####Basic Usage


Put the following code in ```script``` tags in the ```head``` tag of your HTML document.

```
$(document).ready(function(){
	// Make sure to call jcider on the wrapper element
	$('yourWrapperElementHere').jcider();
});
```

> Make sure to call ```.jcider()``` on the wrapper element. 


####Advance Usage- Settings


You can pass in multiple options as arguments for the ```.jcider()``` function. They are-

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

| Setting Name | Value | Description | Default |
|--------------|-------|-------------|---------|
| looping | boolean | Selects if looping is there or not. | true |
| visibleSlides | integer | Selects the number of slides visble at a time. | 1 |
| variableWidth | boolean | Selects if the wrapper should resize with the slide width or not. | false |
| variableHeight | boolean | Selects if the wrapper should resize with the slide height or not. | true |
| fading | boolean | Selects the type of transition. true is fading. ```false``` is sliding. | false |
| easing | string | Selects the type of easing to be used for CSS animations. | 'cubic-bezier(.694, .0482, .335, 1)' |
| transitionDuration | integer | The duration taken to transition from one slide to another, in milliseconds. | 400 |
| autoplay | boolean | Chooses whether automatic transition between slides is on or off. ```true``` is on. | false |
| slideDuration | integer | The duration between change of slides, in milliseconds. Only applicable if autoplay is on. | 3000 |
| controls | boolean | Chooses whether the navigation controls are visible or not. ```true``` is visible. | true |
| controlsWrapper | string | Selector for the nav-wrapper. Element followed by an optional id or multiple classes. Multiple classes must be separated by periods. | 'div.jcider-nav' |
| controlsLeft | array > string * 2 | Selector for left button for nav. Array containing two strings. The first string is the Element followed by an optional id or multiple classes. Multiple classes must be separated by periods. The second string is optional content. | ['span.jcider-nav-left', ''] |
| controlsRight | array > string * 2 | Selector for right button for nav. Array containing two strings. The first string is the Element followed by an optional id or multiple classes. Multiple classes must be separated by periods.  | ['span.jcider-nav-right', ''] |
| pagination | boolean | Chooses whether the pagination is visible or not. ```true``` is visible. | true |
| paginationWrapper | string | Selector for pagination-wrapper. Element followed by an optional id or multiple classes. Multiple classes must be separated by periods. | 'div.jcider-pagination' |
| paginationPoints | string | Selector for pagination-points. Element followed by an optional id or multiple classes. Multiple classes must be separated by periods. | 'span.jcider-pagination-point' |


####Using Multiple carousels in one page


You can use multiple carousels in one page with ease. There may be two or more sliders with the same class.


For example your **HTML** would be-

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

Your **JavaScript** would be-

```
$('.slider').jcider();
$('.another-slider').jcider();
```


##Functions


The plugin provides functions other than `.jcider()` to provide more extensibility, to suit your requirements.


####`jcider.moveLeft()`


The `jcider.moveLeft()` function makes the slider transition towards the left once.


**Arguments:** none


Example:

```
$(document).ready(function() {
	$('#main').jcider({
		//Some options
	});

	$('button#left').click(function() {
		$('#main').jcider.moveLeft();
	});
});
```


####`jcider.moveRight()`


The `jcider.moveRight()` function makes the slider transition towards the right once.


**Arguments:** None


Example:

```
$(document).ready(function() {
	$('#main').jcider({
		//Some options
	});

	$('button#right').click(function() {
		$('#main').jcider.moveRight();
	});
});
```


####`jcider.moveTo(index)`


The `jcider.moveTo(index)` function makes the slider transition to your desired slide.


**Arguments:** index to be transitioned to. (integer)


Example:

```
$(document).ready(function() {
	$('#main').jcider({
		//Some options
	});

	$('button#home').click(function() {
		$('#main').jcider.moveTo(0);
	});
});
```


####`jcider.play()`


The `jcider.play()` function makes the slider switch to autoplay.


**Arguments:** None


Example:

```
$(document).ready(function() {
	$('#main').jcider({
		//Some options
	});

	$('button#play').click(function() {
		$('#main').jcider.play();
	});
});
```


####`jcider.pause()`


The `jcider.pause()` function makes the slider stop autoplay.


**Arguments:** None


Example:

```
$(document).ready(function() {
	$('#main').jcider({
		//Some options
	});

	$('button#pause').click(function() {
		$('#main').jcider.pause();
	});
});
```


####`jcider.togglePlay()`


The `jcider.togglePlay()` function toggles between starting or stop autoplay.


**Arguments:** None


Example:

```
$(document).ready(function() {
	$('#main').jcider({
		//Some options
	});

	$('button#toggle').click(function() {
		$('#main').jcider.togglePlay();
	});
});
```


####`jcider.hideControls()`


The `jcider.hideControls()` function disables the Controls.


**Arguments:** None


Example:

```
$(document).ready(function() {
	$('#main').jcider({
		//Some options
	});

	$('button#hide').click(function() {
		$('#main').jcider.hideControls();
	});
});
```


####`jcider.showControls()`


The `jcider.showControls()` function enables the Controls.


**Arguments:** None


Example:

```
$(document).ready(function() {
	$('#main').jcider({
		//Some options
	});

	$('button#show').click(function() {
		$('#main').jcider.showControls();
	});
});
```


####`jcider.toggleControls()`


The `jcider.toggleControls()` function toggles between enabling and disabling the Controls.


**Arguments:** None


Example:

```
$(document).ready(function() {
	$('#main').jcider({
		//Some options
	});

	$('button#show').click(function() {
		$('#main').jcider.showControls();
	});
});
```


####`jcider.hidePagination()`


The `jcider.hidePagination()` function disables the pagination.


**Arguments:** None


Example:

```
$(document).ready(function() {
	$('#main').jcider({
		//Some options
	});

	$('button#hide').click(function() {
		$('#main').jcider.hidePagination();
	});
});
```


####`jcider.showPagination()`


The `jcider.showPagination()` function enables the pagination.


**Arguments:** None


Example:

```
$(document).ready(function() {
	$('#main').jcider({
		//Some options
	});

	$('button#show').click(function() {
		$('#main').jcider.showPagination();
	});
});
```


####`jcider.togglePagination()`


The `jcider.togglePagination()` function toggles between enabling and disabling the pagination.


**Arguments:** None


Example:

```
$(document).ready(function() {
	$('#main').jcider({
		//Some options
	});

	$('button#show').click(function() {
		$('#main').jcider.togglePagination();
	});
});
```



##Dependencies


[jQuery](https://jquery.com) - **Using the lastest version is recommended**



##License


Copyright (c) 2015 Pratinav Bagla


This content is released under [The MIT License](http://github.com/Pratinav/jCider/blob/master/LICENSE.txt).


**See a typo? Think docs can be improved? Send in a [pull request](http://github.com/Pratinav/jCider/pulls) or tell me in the [issues page](http://github.com/Pratinav/jCider/issues).**
