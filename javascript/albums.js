window.onresize=function(){
	console.debug();
}

/***************************************************** Declararations ***************************************/
// Settings
var feedUrl = 'http://localhost:8080/json'; // path to JSON service

var bufferLimit = 100; // how many images are loaded from JSON
var initialSize = 316; // size (w x h) of each cover
var frameRate = 1000/30;

// General Variables
var l = 0;
var buffer = [];
var totalColumns;

// Swap Timer Variables
var t;
var c = 0;
var timer_is_on = 0;

// States
var position = 0; // position 0=stack and 1=tile



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
		
		
		if(position == 0) {
			// stack
			positionAsStack(initialSize);
		} else {
			positionAsTile(initialSize);
		}
		
		
		
			
	});
	
});

/***************************************************** Tweening Functions ***************************************/

function switchToStack() {
	position = 0;
	positionAsStack(initialSize);
}

function switchToTile() {
	/*
	t1 = new Tween(document.getElementById('14').style,'left',Tween.regularEaseOut,0,-1,2,'px');
	t2 = new Tween(document.getElementById('14').style,'top',Tween.regularEaseOut,0,-1,2,'px');
	t1.start();
	t2.start();
	*/
	position = 1;
	positionAsTile(initialSize, buffer)
}




/***************************************************** Position Functions ***************************************/

// One cover Image Swaps
function positionAsStack(initialSize) {
	$.each(buffer, function(i, l){
		var posX = getResolution()[0] / 2 - initialSize/2;
		var posY = getResolution()[1] / 2 - initialSize/2;
		$("#"+i).css("left",posX);
		$("#"+i).css("top",posY);

	});


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

function updatePosition() {
	
}

//window.onresize = positionAsTile(); 

/***************************************************** Swap Functions **************************************/

function displayCovers(buffer) {
	$("#coverStack").css("display", "none");
	
	$.each(buffer, function(i, l){
	   $(document.createElement("img")).attr({ src: l }).addClass("stack").appendTo("#coverStack").css("width",initialSize).css("height",initialSize).css("z-index",'1').attr("id",i);
		
	});
	
	if(allImagesLoaded() == 1) {
		console.debug("test");
		$("#coverStack").css("display", "block");
		
		$('#coverStack').fadeIn('slow', function() {
	     // alert("Animation complete");
	    });
	
	}


}

function allImagesLoaded() {

	// return variable
	var imagesloaded = 1;

	// All images are saved in an array called document.images. Very usefull
	var img = document.images;
	// Loop through all the images
	for (var i = 0;i<img.length;i++)
	{
		// If the image isnt loaded we set the return varible to 0
		if(img[i].complete == false) {
			imagesloaded = 0;
		}
	}

	// This will return 0 if one or more images are not loaded and 1 if all images are loaded.
	return imagesloaded;
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
	t = setTimeout("timedCount()",frameRate);
	changeIndex();
}

// Window Events
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
	console.debug()
	
	return resolution;

}

window.onresize=function(){
	updatePosition();
}
