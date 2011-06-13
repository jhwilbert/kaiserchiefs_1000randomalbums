/***************************************************** Settings ***************************************/

var feedUrl = 'http://localhost:8080/json'; // path to JSON service
var bufferLimit = 1000; // how many images are loaded from JSON
var initialSize = 250; // size (w x h) of each cover
var gap = 50; // gap between images

/***************************************************** Declararations ***************************************/

// Cover Arrays
buffer = [];
userbuffer = [];
covers = [];

// General Variables
var posX;
var posY;
var l = 0;
var totalColumns;
var direction;
var zoomCover = 1;
var zoomgap = 1;
var finalGap;

var minZoom = 0.3;
var maxZoom = 1.0;

var fontSize = 12;
var linkSize = 20;
var updatedLinkSize = linkSize;
var updatedFontSize = fontSize;
//var parallel;  
//var sequence;

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

/***************************************************** Grid Object **************************************/

function grid(userbuffer,buffer) {
	
	
	  if (typeof(_grid_prototype_called) == 'undefined') {
	     _gridprototype_called = true;
	     grid.prototype.generate = generate;
    	 grid.prototype.zoom = zoom;
    	 grid.prototype.calculateUp = calculateUp;
         grid.prototype.calculateDown = calculateDown;
	  }
	
	function generate(userbuffer,buffer) {
		$.each(buffer, function(i, l){

			// instantiate covers
			covers[i] = new coverSingle(i,l);
			
			// tile elements
			row = Math.floor(i/totalColumns);	
			column = i % totalColumns;
			tilePosX = (initialSize + gap) * column;
			tilePosY = (initialSize + gap) * row;
			covers[i].updatePosition(i,tilePosX,tilePosY);
		});
	}	
	
	function calculateUp(number){
		return Math.round((number + 0.1)*100)/100;
	}
	function calculateDown(number){
		return Math.round((number - 0.1)*100)/100;
	}
	
	function zoom(direction) {
		if(direction == 0) {
			// limit minZoom
			if(zoomCover == minZoom) {
				zoomCover = minZoom;
			} else {
				zoomCover = calculateDown(zoomCover);
				zoomgap = calculateDown(zoomgap);
				updatedLinkSize = updatedLinkSize - 2;
				updatedFontSize = updatedFontSize - 1;				
			}
		} else {
			// limit maxZoom		
			if(zoomCover == maxZoom) {
				zoomCover = maxZoom;
			} else {
				zoomCover = calculateUp(zoomCover);
				zoomgap = calculateUp(zoomgap);
				updatedLinkSize = updatedLinkSize + 2;
				updatedFontSize = updatedFontSize + 1;
			}
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
			covers[i].updatePosition(i,tilePosX,tilePosY);			
		});
		
		// update container dimensions
		$("#container").css("width",containerSize * zoomCover);
		$("#container").css("height",containerSize  * zoomCover);		
		
		$("#container").css("left", stageSize()[0]/2 - (containerSize * zoomCover)/2);
		$("#container").css("top", stageSize()[1]/2 - (containerSize * zoomCover)/2);
		

		$(".cover a").css("font-size", updatedLinkSize + "px");
		$(".cover").css("font-size", updatedFontSize + "px");

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
	//console.debug("fit in window height"+Math.round(stageSize()[1]/(initialSize+gap)));
	
	grid = new grid(userbuffer,buffer,0);
	grid.generate(userbuffer,buffer,0);
}


/***************************************************** Cover Stack Object **************************************/

function zoomgrid(direction) {
	grid.zoom(direction)
}

// singleCover object
function coverSingle(i,l) {
	   $(document.createElement("div")).attr("id","cover_"+i).appendTo("#container").addClass("cover"); 												     //  creates 2 "#cover0_0"
	   $(document.createElement("div")).attr("id","coverfront_"+i).appendTo("#cover_"+i).addClass("front");													 //  creates 3 "#coverfront0_0" front
	   $(document.createElement("div")).attr("id","coverback_"+i).appendTo("#cover_"+i).addClass("back"); 													 // creates 4 "#coverback0_0"	back
	   $(document.createElement("img")).attr({ src: l }).attr("id","img_"+i).appendTo("#coverfront_"+i).css("width",initialSize).css("height",initialSize);  // image element
	   
	   $("#coverback_"+i).css("width", initialSize);
       $("#coverback_"+i).css("height", initialSize);

	   $("#coverback_"+i).html('<div class="backcontent">Created By:<br><a href="http://www.kaiserchiefs.com/'+userbuffer[i]+'">'+userbuffer[i]+'</a></div>');

	   $("#cover_"+i).hover(function () {
	   		$(this).find('div').stop().rotate3Di('flip', 200, {direction: 'clockwise', sideChange: mySideChange}); },function () {
       		$(this).find('div').stop().rotate3Di('unflip', 200, {sideChange: mySideChange});
	   });
		

	  if (typeof(_coverSingle_prototype_called) == 'undefined')	  {
	     _coverSingle_prototype_called = true;
	     coverSingle.prototype.updatePosition = updatePosition;
		 //coverSingle.prototype.tweenToPosition = tweenToPosition;
	     coverSingle.prototype.resize = resize;
	  }
	
	// singleCover methods
	 function updatePosition(i,x,y) {
		$("#cover_"+i).css("top",y);
		$("#cover_"+i).css("left",x);
		
		$("#coverback_"+i).css("top",y);
		$("#coverback_"+i).css("left",x);
	 }	
	
	/*
     function tweenToPosition(i,endx,endy) {
		var p = $("#cover_"+i);				
		var position = p.position();
		currx = position.left;
		curry = position.top;
					
		parallel.addChild(new Tween(document.getElementById("cover_"+i).style,'left',Tween.regularEaseOut,currx,endx,0.4,'px'));
		parallel.addChild(new Tween(document.getElementById("cover_"+i).style,'top',Tween.regularEaseOut,curry,endy,0.4,'px'));				
	 }	
	*/
	function resize(i,initialSize){
		
		$("#img_"+i).css("width",initialSize);
		$("#img_"+i).css("height",initialSize);
		$("#coverfront"+i).css("width",initialSize);
		$("#coverfront"+i).css("height",initialSize);
		$("#coverback_"+i).css("width",initialSize);
		$("#coverback_"+i).css("height",initialSize);
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



/***************************************************** Window Size  ***************************************/

function stageSize() {
	 var viewportwidth;
	 var viewportheight;

	 if (typeof window.innerWidth != 'undefined') {
	      viewportwidth = window.innerWidth,
	      viewportheight = window.innerHeight
	 } else if (typeof document.documentElement != 'undefined'
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
	if (obj.addEventListener) {
		obj.addEventListener(evt,fn,false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on'+evt,fn);
	}
}

function removeEventSimple(obj,evt,fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(evt,fn,false);
	} else if (obj.detachEvent) {
		obj.detachEvent('on'+evt,fn);
	}
}

/*
window.onresize=function(){

}

*/



