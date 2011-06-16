/***************************************************** Settings ***************************************/

var feedUrl = 'http://localhost:8181/json'; // path to JSON service
var bufferLimit = 80; // how many images are loaded from JSON
var initialSize = 200; // size (w x h) of each cover
var gap = 4; // gap between images

/***************************************************** Declararations ***************************************/

//  Arrays
buffer = [];
userbuffer = [];
covers = [];
highlightbuffer = [];
lookupGrid = [];
smallcovers = [];
blackListRow = [];
blackListCol = [];
whiteListRow = [];
whiteListCol = [];

// General Variables
var posX;
var posY;
var l = 0;
var totalColumns;
var direction;
var zoomCover = 1;
var zoomgap = 1;
var finalGap;

var minZoom = 0.1;
var maxZoom = 1.0;

var fontSize = 12;
var linkSize = 20;
var updatedLinkSize = linkSize;
var updatedFontSize = fontSize;
var finalx;
var finaly;
var row;
var column;

var randRow;
var randCol;
var temp = 0;

//var parallel;  
//var sequence;
over = false;

/***************************************************** Jquery Init Stuff ***************************************/

$(document).ready(function(){	
	$.getJSON(feedUrl, function(data) {
		
	  $.each(data, function(key, val) {
		if(buffer.length >= bufferLimit) {	
		    //stop adding
		} else {
			buffer.push(val.path);
			userbuffer.push(val.username);
			highlightbuffer.push(val.highlight);
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


/***************************************************** Container   ***************************************/

function container() {
	// calculate size of the container
	
	totalColumns = Math.floor(bufferLimit/Math.sqrt(bufferLimit));
	containerSize = totalColumns*(initialSize + gap);
	containerCenter = containerSize/2;
	
	$("#container").css("left", (stageSize()[0]/2) - (containerCenter));
	$("#container").css("top", (stageSize()[1]/2) - (containerCenter));
	
	// drag
	var theRoot = document.getElementById("container");
	Drag.init(theRoot, null);
	
	$("#container").css("width",containerSize);
	$("#container").css("height",containerSize);
		
	
	// create grid object
	grid = new grid(userbuffer,buffer,0);
	grid.generate(userbuffer,buffer,0);

}
function zoomgrid(direction) {
	grid.zoom(direction)
}


