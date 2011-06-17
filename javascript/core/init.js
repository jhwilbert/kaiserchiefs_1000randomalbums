/***************************************************** Settings ***************************************/

var feedUrl = 'http://localhost:8181/display'; // path to JSON service
var bufferLimit = 1300; // how many images are loaded from JSON
var initialSize = 200; // size (w x h) of each cover
var gap = 0; // gap between images

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

	
allPaths = [];
allUsernames = [];
allHighlights = [];

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

var len;

offset = [];
useroffset = [];
highlightoffset = [];


/***************************************************** Jquery Init Stuff ***************************************/

$(document).ready(function(){
	

	$.getJSON(feedUrl, function(data) {

	  $.each(data, function(key, val) {
		

		if(buffer.length >= bufferLimit) {	
			offset.push(val.path);
			useroffset.push(val.username);
			highlightoffset.push(val.highlight);
		} else {
			buffer.push(val.path);
			userbuffer.push(val.username);
			highlightbuffer.push(val.highlight);
		}
			  
	  });
	
	bufferLimit = buffer.length;

	

		
	container = new container();
    grid = new grid();

	preload();
	
	});	

});

function selectFrom(iFirstValue, iLastValue) {
    var iChoices = iLastValue - iFirstValue + 1;
    return Math.floor(Math.random() * iChoices + iFirstValue);
}


function checkLoaded(){
	//console.debug(loadedImgs.length);
	//console.debug("bufferlimit"+buffer.length);
			
	if(loadedImgs.length >= buffer.length) {
		$("#loading").html("");
		container.init();
		grid.init();
	}

}

loadedImgs = [];

function preload() {
		
	image = new Image();
		
	for(var i = 0; i <= bufferLimit; i++) {
	   		image.src = buffer[i];
			loadedImgs.push(image.src);
			checkLoaded();
	}
}


	

function zoomgrid(direction) {
	grid.zoom(direction)
}


