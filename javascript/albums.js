



/***************************************************** Declararations ***************************************/

// Settings
var feedUrl = 'http://localhost:8080/json'; // path to JSON service

var bufferLimit = 4; // how many images are loaded from JSON
var initialSize = 316; // size (w x h) of each cover
var frameRate =  1000; // mouseover framerate
var rotationRate = 1000;

// General Variables
var l = 0;
var buffer = [];
var userbuffer = [];
var	stacks = [];
var totalColumns;
var totalCovers;
var randomnumber;
var	totalColumns;
var tileTotal;

var posX;
var posY;


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
			userbuffer.push(val.username);	
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





/***************************************************** Tweening Functions ***************************************/

function getUsername(index) {
	return userbuffer[index];
}

/*

function switchToTile(tileTotal,totalColumns) {
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
	
       stacks[i] = new coverStack(userbuffer,buffer,i,tilePosX,tilePosY);	

	}
	totalCovers = stacks.length;
	centralize(tileTotal,totalColumns);
	
}

*/

function switchToTile(tileTotal,totalColumns) {
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
	
       stacks[i] = new coverStack(userbuffer,buffer,i,tilePosX,tilePosY);	

	}
	totalCovers = stacks.length;
	centralize(tileTotal,totalColumns);
	
}
/***************************************************** Tweening Functions ***************************************/

function centralize(tileTotal,totalColumns) {
	
	totalRows = tileTotal / totalColumns;

	posX = getResolution()[0] / 2 - (totalColumns * initialSize)/2;
	posY = getResolution()[1] / 2 - (totalRows * initialSize)/2;		

	$("#container").css("left",posX);
	$("#container").css("top", posY);
	
	usernameCenter = (getResolution()[0] / 2) - 550;
	$("#username").css("left",usernameCenter);
	//$("#username").css("top",900);
	
}

/***************************************************** Cover Stack Object **************************************/

function



function coverStack(userbuffer,imagestack,divindex,x,y) {
	
	this.imagestack=imagestack;
	this.divindex=divindex;
	this.x = x;
	this.y = y;
	
	
	// create indexed stack div
	//$("#container").append('<div class="floatStack" id="coverStackContainer'+divindex+'"+""''</div>');

	$("#container").append('<div class="floatStack" id="coverStackContainer'+divindex+'"></div>');
		
	$("#coverStackContainer"+divindex).append('<div class="floatStack" id="coverStack'+divindex+'" onMouseOver="handleOver('+divindex+')" onMouseOut="handleOut('+divindex+')"></div>');
	$("#coverStackContainer"+divindex).append('<div class="floatStack" id="userStack'+divindex+'"></div>');
	
	// hide it during loading
	$("#coverStack"+divindex).css("display", "none");
	
	// position stack
	$("#coverStack"+divindex).css("left",x);
	$("#coverStack"+divindex).css("top",y);
	
	$("#userStack"+divindex).css("left",x);
	$("#userStack"+divindex).css("top",y + initialSize);
	
	// append images	
	$.each(imagestack, function(i, l){
	   $(document.createElement("div")).attr("id","cover"+divindex +"_"+i).appendTo("#coverStack"+divindex).css("z-index",'1').addClass("stack"); // subdiv of stack
	   $(document.createElement("img")).attr({ src: l }).appendTo("#cover"+divindex +"_"+i).css("width",initialSize).css("height",initialSize); // add images to subdiv
	
	    $(document.createElement("div")).attr("id","user"+divindex +"_"+i).appendTo("#userStack"+divindex).attr("class","username").attr("display","none"); // user div subdiv of stack
	
	   $("#user"+divindex +"_"+i).html(userbuffer[i]+'<a href="http://www.kaiserchiefs.com/'+userbuffer[i]+'">'+'<br>www.kaiserchiefs.com/'+userbuffer[i]+'</a>');

		
	});
	

	// fade in if loaded
	if(allImagesLoaded() == 1) {
		$("#coverStack"+divindex).css("display", "block");
		$("#coverStack"+divindex).fadeIn('slow', function() {
	     // alert("Animation complete");
	    });
	}
}

function changeIndex(divindex) {
	console.debug("change" + l);
	
	// check if rollover is in the same stack
	if (currentRollover != divindex) {
		l = 0;
	} 
	
	l = l+1;
	
	
	$("#cover"+divindex +"_"+ (bufferLimit - (l-1)) ).css({'z-index' : '0' });
	$("#cover"+divindex +"_"+ (bufferLimit - (l)) ).css({'z-index' : '1'  });
	
	
	$("#user"+divindex +"_"+ (bufferLimit - (l-1)) ).css({'z-index' : '0' });
	$("#user"+divindex +"_"+ (bufferLimit - (l)) ).css({'z-index' : '1' });
	
	
	if( l == bufferLimit) {
		l = 0;
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



// Swap Timmer
function timedCount(divindex) {
	c=c+1;
	t = setTimeout("timedCount("+divindex+")",frameRate);
	changeIndex(divindex);
}

function activateTimer(divindex) {
	timedCount(divindex,frameRate);
	currentRollover = divindex;
	timer_is_on=1;
}
function handleOver(divindex) {
	console.debug("over");
	activateTimer(divindex)
	

}

function handleOut(divindex) {
	console.debug("out");
	if (timer_is_on == 1) {
		clearInterval(t);
  		timer_is_on=0;
  	}

}



/***************************************************** Timmers  ***************************************/



// Rotation Timmer
function timedRotation() {
	v=v+1;
	randomnumber = Math.floor(Math.random()*totalCovers)
	r = setTimeout("timedRotation()",rotationRate);
	changeIndex(randomnumber);
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
	centralize();
}

