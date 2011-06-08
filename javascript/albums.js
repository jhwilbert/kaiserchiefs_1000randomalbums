/***************************************************** Declararations ***************************************/

// Settings
var feedUrl = 'http://localhost:8080/json'; // path to JSON service

var bufferLimit = 40; // how many images are loaded from JSON
var initialSize = 250; // size (w x h) of each cover
var frameRate =  1000/10; // mouseover framerate
var rotationRate = 1000;

// General Variables
var l = 0;
var buffer = [];
var	stacks = [];
var totalColumns;
var totalCovers;
var randomnumber;
var	totalColumns = 5;
var tileTotal = 10;

var posX;
var posY;

var state = 0; // 0 - stack       1 - tile

// Rotation Timer Variables
var r;
var v = 0;
var rotation_is_on = 0;

// Swap Timer Variables
var t;
var c = 0;
var timer_is_on = 0;
var currentRollover;

var s = 0;

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
			
	});
	
	
});

/***************************************************** Username Functions ***************************************/


/***************************************************** Tweening Functions ***************************************/

function centralize(state) {
	
	if(state == 1) { // tile
		totalRows = tileTotal / totalColumns;
		// position stack
		posX = getResolution()[0] / 2 - (totalColumns * initialSize)/2;
		posY = getResolution()[1] / 2 - (totalRows * initialSize)/2;		
	}
	if(mode == 0 ) { // stack
  		totalRows = tileTotal / totalColumns;
		// position stack
		posX = getResolution()[0] / 2 - initialSize/2;
		posY = getResolution()[1] / 2 - initialSize/2;		
	}

	$("#container").css("left",posX);
	$("#container").css("top",posY);
	
	usernameCenter = (getResolution()[0] / 2) - 550;
	$("#username").css("left",usernameCenter);
	//$("#username").css("top",900);
	
}

/***************************************************** Tweening Functions ***************************************/

function switchToStack() {
	// clean container
	$("#container").html("");
	var uniquestack=new coverStack(buffer,999,0,0);
	mode = 0; // stack
	centralize(mode);
}

function switchToTile() {
	// clean container
	$("#container").html("");
	
	var widthCols = Math.floor(getResolution()[0]/initialSize);
	var heightRows = Math.floor(getResolution()[1]/initialSize);
	
	//totalAllowed = widthCols + widthCols;
		
	for (i=0; i< tileTotal; i++) 	{
		   
	   row = Math.floor(i/totalColumns);	
	   column = i % totalColumns;

	   tilePosX = initialSize * column;
	   tilePosY = initialSize * row;
	
       stacks[i] = new coverStack(buffer,i,tilePosX,tilePosY);	

	}
	totalCovers = stacks.length;
	
	mode = 1; // stack
	centralize(mode);
	
	// start rotation
	//timedRotation();
	//rotation_is_on = 1;
	
}





/***************************************************** Position Functions ***************************************/

// One cover Image Swaps
function positionAsStack() {
		var posX = getResolution()[0] / 2 - initialSize/2;
		var posY = getResolution()[1] / 2 - initialSize/2;
		
		position = [2];
		position[0] = posX;
		position[1] = posY;
		
		return position;
}

/***************************************************** Cover Stack Object **************************************/


/* creating object based on constructor  */


function coverStack(imagestack,divindex,x,y) {
	
	this.imagestack=imagestack;
	this.divindex=divindex;
	this.x = x;
	this.y = y;
	
	
	// create indexed stack div
	$("#container").append('<div class="floatStack" id="coverStack'+divindex+'" onMouseOver="handleOver('+divindex+')" onMouseOut="handleOut('+divindex+')"></div>');
	
	// hide it during loading
	$("#coverStack"+divindex).css("display", "none");
	
	// position stack
	$("#coverStack"+divindex).css("left",x);
	$("#coverStack"+divindex).css("top",y);
	
	// append images
	$.each(imagestack, function(i, l){
	   $(document.createElement("img")).attr({ src: l }).addClass("stack").appendTo("#coverStack"+divindex).css("width",initialSize).css("height",initialSize).css("z-index",'1').attr("id","coverStack"+divindex +"_"+i);
	});
	
	// fade in if loaded
	if(allImagesLoaded() == 1) {
		$("#coverStack"+divindex).css("display", "block");
		$("#coverStack"+divindex).fadeIn('slow', function() {
	     // alert("Animation complete");
	    });
	}
}



function allImagesLoaded() {
	var imagesloaded = 1;
	var img = document.images;

	for (var i = 0;i<img.length;i++) {
		// If the image isnt loaded we set the return varible to 0
		if(img[i].complete == false) {
			imagesloaded = 0;
		}
	}
	return imagesloaded;
}



/***************************************************** Additional as stack **************************************/


// Handlers
function handleOver(divindex) {
	timedCount(divindex,frameRate);
	currentRollover = divindex;
	timer_is_on=1;
}

function handleOut(divindex) {
	if (timer_is_on == 1) {
		clearInterval(t);
  		timer_is_on=0;
  	}
}



/***************************************************** Timmers  ***************************************/


// Swap Timmer
function timedCount(divindex) {
	c=c+1;
	t = setTimeout("timedCount("+divindex+")",frameRate);
	changeIndex(divindex);
}


// Rotation Timmer
function timedRotation() {
	v=v+1;
	randomnumber = Math.floor(Math.random()*totalCovers)
	r = setTimeout("timedRotation()",rotationRate);
	changeIndex(randomnumber);
}



function changeIndex(divindex) {

	
	// RANDOM ROTATION
	if(rotation_is_on == 1) {
		s = s + 1;
		
		console.debug("div index:"+"#coverStack"+divindex +"_"+ (bufferLimit - (s-1)) )
		$("#coverStack"+divindex +"_"+ (bufferLimit - (s-1)) ).css({'z-index' : '0' });
		//$("#coverStack"+divindex +"_"+ (bufferLimit - (s)) ).css({'z-index' : '1' });
		if( s == bufferLimit) {
			s = 0;
		}
	} 
	
	// MOUSEOVER ROTATION 
	// check if rollover is in the same stack
	if (currentRollover != divindex) {
		l = 0;
	} 
	
	l = l+1;

	$("#coverStack"+divindex +"_"+ (bufferLimit - (l-1)) ).css({'z-index' : '0' });
	$("#coverStack"+divindex +"_"+ (bufferLimit - (l)) ).css({'z-index' : '1' });
	
	if( l == bufferLimit) {
		l = 0;
	}
	

	
}


/***************************************************** Window  ***************************************/

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
	
	return resolution;

}


window.onresize=function(){
	centralize(mode);
}
