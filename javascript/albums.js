// Variables
var feedUrl = 'http://localhost:8080/json';
var buffer = [];
var loadBuffer = 1000;
var initialSize = 300;
var currentSize = initialSize;

// Swap Timer Variables
var c = 0;
var timer_is_on = 0;
var t;

// Resize Timer Variables
var s = 0;
var resize_is_on=0;
var v;


// Initialize JQUERY
$(document).ready(function(){
	
	$.getJSON(feedUrl, function(data) {
	  $.each(data, function(key, val) {	
		    buffer.push(val.path);			
	  });
	
	// preload images
	if (document.images) {
		preload_image_object = new Image();
		var i = 0;
	
		for(i=0; i<=loadBuffer; i++) 
	   		preload_image_object.src = buffer[i];
		}
		// display one
		displayCover(buffer,0);
	});
	
	positionCover(initialSize,currentSize);
	//timedResize();
});


// One cover Image Swaps
function positionCover(initialSize,currentSize) {

		var posX = getResolution()[0] / 2 - currentSize/2;
		var posY = getResolution()[1] / 2 - currentSize/2;
		$("#coverArt").css("left",posX);
		$("#coverArt").css("top",posY);	

}

function resizeCover(initialSize,scaleFactor) {
	
	currentSize = initialSize + scaleFactor / 10;
	
	$("#coverArt").css("width",currentSize);
	$("#coverArt").css("height",currentSize);
	
//	console.debug();
	
	positionCover(initialSize,currentSize);
	
}

function displayCover(buffer,i) {
	$("#coverArt").attr("src", buffer[i]);
}

function swapCover(c) {
	$("#coverArt").attr("src", buffer[c]);
}

// Handlers
function handleOver(id) {
	//console.debug("over");
	timedCount();
	timer_is_on=1;
}

function handleOut(id) {
	//console.debug("out");
	if (timer_is_on == 1) {
		clearInterval(t);
  		timer_is_on=0;
  	}
}

// Swap Timmer
function timedCount() {
	c=c+1;
	t = setTimeout("timedCount()",1000/30);
	swapCover(c);
}

// Resize Timmer
function timedResize() {
	s=s+1;
	s = setTimeout("timedResize()",1000/10);
	resizeCover(initialSize,s);
	
}


// Helpers
function getResolution() {
	 var viewportwidth;
	 var viewportheight;

	 if (typeof window.innerWidth != 'undefined') {
	      viewportwidth = window.innerWidth,
	      viewportheight = window.innerHeight
	 }	 else if (typeof document.documentElement != 'undefined'
	     && typeof document.documentElement.clientWidth !=
	     'undefined' && document.documentElement.clientWidth != 0)	 
	{
	       viewportwidth = document.documentElement.clientWidth,
	       viewportheight = document.documentElement.clientHeight
	 }	else {
	       viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
	       viewportheight = document.getElementsByTagName('body')[0].clientHeight
	 }
	
	resolution = new Array(2);
	
	resolution[0] = viewportwidth;
	resolution[1] = viewportheight;
	
	// array - [0] width [1] height
	return resolution;
}


