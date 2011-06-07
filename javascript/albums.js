/***************************************************** Declararations ***************************************/

// Variables
var feedUrl = 'http://localhost:8080/json';

var buffer = [];
var bufferLimit = 30;
var initialSize = 300;
var l = 0;
var totalColumns;

// Swap Timer Variables
var c = 0;
var timer_is_on = 0;
var t;


/***************************************************** Jquery Init Stuff ***************************************/

$(document).ready(function(){
	
	$.getJSON(feedUrl, function(data) {
	  $.each(data, function(key, val) {
		if(buffer.length >= bufferLimit) {	
		    // stop adding
		} else {
			buffer.push(val.path);	
		}
	  });
	
	// preload images
	if (document.images) {
		preload_image_object = new Image();
		var i = 0;
	
		for(i=0; i<=bufferLimit; i++) 
	   		preload_image_object.src = buffer[i];
		}
		
		displayCovers(buffer);
		positionAsStack(initialSize);
			
	});
	
});

/***************************************************** Tweening Functions ***************************************/

function switchToStack() {
	positionAsStack(initialSize);
	
}

function switchToTile() {
	positionAsTile(initialSize, buffer)
}

/***************************************************** Position Functions ***************************************/

// One cover Image Swaps
function positionAsStack(initialSize) {
	$.each(buffer, function(i, l){
	
		$("#"+i).css("left","0");
		$("#"+i).css("top","0");
	});

	var posX = getResolution()[0] / 2 - initialSize/2;
	var posY = getResolution()[1] / 2 - initialSize/2;
	$("#coverStack").css("left",posX);
	$("#coverStack").css("top",posY);	

}

function positionAsTile(initialSize,buffer) {
	
	totalColumns = Math.floor(getResolution()[0]/initialSize);
	
	$("#coverStack").css("left","0");
	$("#coverStack").css("top","0");
	
	$.each(buffer, function(i, l){
		
	   row = Math.floor(i/totalColumns)	
	   column = i % totalColumns;
			
	   tilePosX = initialSize * column;
	   tilePosY = initialSize * row;
	
		$("#"+i).css("left",tilePosX);
		$("#"+i).css("top",tilePosY);
	});

}


/***************************************************** Swap Functions **************************************/

function displayCovers(buffer) {
	$.each(buffer, function(i, l){
	   $(document.createElement("img")).attr({ src: l }).addClass("stack").appendTo("#coverStack").css("width",initialSize).css("height",initialSize).css("z-index",'1').attr("id",i);
	});
}

function changeIndex() {	
	l = l+1;

	$('#'+ (bufferLimit - (l-1)) ).css({'z-index' : '0' });
	$('#'+ (bufferLimit - (l)) ).css({'z-index' : '1' });
	
	if( l == bufferLimit) {
		l = 0;
	}
}

/***************************************************** Additional as stack **************************************/

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
	changeIndex();
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


