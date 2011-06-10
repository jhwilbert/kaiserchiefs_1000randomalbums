/***************************************************** Settings ***************************************/

var feedUrl = 'http://localhost:8080/json'; // path to JSON service
var bufferLimit = 330; // how many images are loaded from JSON
var initialSize = 200; // size (w x h) of each cover
var frameRate =  1000/30; // shuffle framerate
var rotationRate = 10000; // rotation framerate
var gap = 50; // gap between images
var bleed = 40; // set to 0 for window limit, set it to number of desired columns 

/***************************************************** Declararations ***************************************/

// Cover Arrays
buffer = [];
userbuffer = [];
stacks = [];
covers = [];

// General Variables
var posX;
var posY;
var l = 0;
var totalColumns;
var totalCovers;
var tileTotal;

// Rotation Timer Variables
var r;
var v = 0;
var rotation_is_on = 0;

// Swap Timer Variables
var t;
var c = 0;
var timer_is_on = 0;

/***************************************************** Jquery Init Stuff ***************************************/

$(document).ready(function(){	
	$.getJSON(feedUrl, function(data) {
		
	  $.each(data, function(key, val) {
		if(buffer.length >= bufferLimit) {	
		    //stop adding
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
		// takes user names, image paths and creates a grid index - starting at 0
		container();
	});	
});


var parallel;  
var sequence;

var direction;
var zoomCover = 1;
var maxZoom = 1;
var minZoom = 0.3;
var zoomgap = 1;

var finalGap;

/***************************************************** Grid Object **************************************/

function grid(userbuffer,buffer,divindex) {
	
	
	  if (typeof(_grid_prototype_called) == 'undefined') {
	     _gridprototype_called = true;
	     grid.prototype.generate = generate;
    	 grid.prototype.zoom = zoom;
	  }
	
	function generate(userbuffer,buffer,divindex) {
		//parallel = new Parallel();

		// create indexed stack div
		$("#container").append('<div class="floatStack" id="coverStack'+divindex+'"></div>');

		// append image and create stcack
		$.each(buffer, function(i, l){
			// instantiate covers
			covers[i] = new coverSingle(divindex,i,l);
			
			// tile elements
			row = Math.floor(i/totalColumns);	
			column = i % totalColumns;
			tilePosX = (initialSize + gap) * column;
			tilePosY = (initialSize + gap) * row;
			covers[i].updatePosition(0,i,tilePosX,tilePosY);
		});
	}	
	
	function zoom(direction) {
		
		console.debug("ffffffffffff");
		console.debug(zoomCover);
		if(direction == 0) {		
			zoomCover = zoomCover - 0.1;
			zoomgap = zoomgap - 0.1;	
		} else {
			zoomCover = zoomCover + 0.1;
			zoomgap = zoomgap + 0.1;
		}
		
		finalGap = gap * zoomgap;
		finalValue = initialSize * zoomCover;

		$.each(buffer, function(i, l){
			// tile elements	
			row = Math.floor(i/totalColumns);	
			column = i % totalColumns;
			
			tilePosX = (initialSize + finalGap - (initialSize - finalValue) ) * column;
			tilePosY = (initialSize + finalGap - (initialSize - finalValue)) * row;
			
			covers[i].resize(i, finalValue);
			covers[i].updatePosition(0,i,tilePosX,tilePosY);			
		});
		
		// update container dimensions
		$("#container").css("width",containerSize * zoomCover);
		$("#container").css("height",containerSize  * zoomCover);		
		
		$("#container").css("left", stageSize()[0]/2 - (containerSize * zoomCover)/2);
		$("#container").css("top", stageSize()[1]/2 - (containerSize * zoomCover)/2);
		
	}	
}



/***************************************************** Tweening Functions ***************************************/

function container() {
	// calculate size of the container
	
	totalColumns = Math.floor(bufferLimit/Math.sqrt(bufferLimit));
	containerSize = totalColumns*(initialSize + gap);
	containerCenter = containerSize/2;
	
	$("#container").css("left", 0-(containerCenter/2));
	$("#container").css("top", 0-(containerCenter/2));
	
	var theRoot = document.getElementById("container");
	Drag.init(theRoot, null);
	$("#container").css("cursor","move");
	$("#container").css("width",containerSize);
	$("#container").css("height",containerSize);		

	//console.debug("fit in window width"+Math.round(stageSize()[0]/(initialSize+gap)));
	//	console.debug("fit in window height"+Math.round(stageSize()[1]/(initialSize+gap)));
	
	grid = new grid(userbuffer,buffer,0);
	grid.generate(userbuffer,buffer,0);
}


/***************************************************** Cover Stack Object **************************************/

function zoomgrid(direction) {
	grid.zoom(direction)
}

// singleCover object
function coverSingle(divindex,i,l) {
	
	   /*
	   1	<div id="coverStack0" class="floatStack">
	   2	<div id="cover0_0">
	   3		<div id="coverfront_0_0" class="front" ></div>
	   4		<div id="coverback_0_0" class="back" ></div>			
			</div>
		</div>
	   */
	
	   $(document.createElement("div")).attr("id","cover"+divindex +"_"+i).appendTo("#coverStack"+divindex).addClass("floatStack"); //  creates 2 "#cover0_0"
	   $(document.createElement("div")).attr("id","coverfront"+divindex +"_"+i).appendTo("#cover"+divindex +"_"+i).addClass("front")//  creates 3 "#coverfront0_0" front
	   $(document.createElement("div")).attr("id","coverback"+divindex +"_"+i).appendTo("#cover"+divindex +"_"+i).addClass("back")// creates 4 "#coverback0_0"	
	
	   $(document.createElement("img")).attr({ src: l }).attr("id","img"+divindex +"_"+i).appendTo("#coverfront"+divindex +"_"+i).css("width",initialSize).css("height",initialSize); // create image element for front
	   
	   $("#coverback"+divindex +"_"+i).css("width", initialSize);
       $("#coverback"+divindex +"_"+i).css("height", initialSize);
		
	   //$("#coverback"+divindex +"_"+i).html('<div class="backcontent"><div id="content">Created By:</div><a href="http://www.kaiserchiefs.com/'+userbuffer[i]+'">'+userbuffer[i]+'</a></div>');
		
	   $("#cover"+divindex +"_"+i).hover(function () {
	   $(this).find('div').stop().rotate3Di('flip', 200, {direction: 'clockwise', sideChange: mySideChange}); },function () {
       $(this).find('div').stop().rotate3Di('unflip', 200, {sideChange: mySideChange});
	    });
		

	  if (typeof(_coverSingle_prototype_called) == 'undefined')	  {
	     _coverSingle_prototype_called = true;
	     coverSingle.prototype.updatePosition = updatePosition;
		 coverSingle.prototype.tweenToPosition = tweenToPosition;
	     coverSingle.prototype.resize = resize;
	  }
	
	// singleCover methods
	 function updatePosition(divindex,i,x,y) {
		$("#cover"+divindex +"_"+i).css("top",y);
		$("#cover"+divindex +"_"+i).css("left",x);
		//console.debug("initialyx="+x,"initialy="+y)
	 }	
	
     function tweenToPosition(i,endx,endy) {
		var p = $("#cover"+divindex +"_"+i);				
		var position = p.position();
		currx = position.left;
		curry = position.top;
					
		parallel.addChild(new Tween(document.getElementById("cover"+divindex +"_"+i).style,'left',Tween.regularEaseOut,currx,endx,0.4,'px'));
		parallel.addChild(new Tween(document.getElementById("cover"+divindex +"_"+i).style,'top',Tween.regularEaseOut,curry,endy,0.4,'px'));				
	 }	
	
	function resize(i,initialSize){
		$("#img"+0 +"_"+i).css("width",initialSize);
		$("#img"+0 +"_"+i).css("height",initialSize);
		$("#coverback"+0 +"_"+i).css("width", initialSize);
        $("#coverback"+0 +"_"+i).css("height", initialSize);	
	}
}

function mySideChange(front) {
    if (front) {
        $(this).parent().find('div.front').show();
        $(this).parent().find('div.back').hide();        
    } else {
        $(this).parent().find('div.front').hide();
        $(this).parent().find('div.back').show();
    }
}



/***************************************************** Window  ***************************************/

// Window Events
function stageSize() {
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

function stageCenter() {
	initialposX = stageSize()[0] / 2 - initialSize/2;
	initialposY = stageSize()[1] / 2 - initialSize/2;
	
	center = [2];
	center[0] = initialposX;
	center[1] = initialposY;
	
	return center;
}



function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,fn,false);
	else if (obj.attachEvent)
		obj.attachEvent('on'+evt,fn);
}

function removeEventSimple(obj,evt,fn) {
	if (obj.removeEventListener)
		obj.removeEventListener(evt,fn,false);
	else if (obj.detachEvent)
		obj.detachEvent('on'+evt,fn);
}


/*
window.onresize=function(){

}

*/



