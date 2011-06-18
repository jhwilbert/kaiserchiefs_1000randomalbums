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
image = [];
offset = [];
highlightoffset = [];
useroffset = [];

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

// Timers
var c=0;
var t;
var timer_is_on=0;
var s;


/***************************************************** Jquery Init Stuff ***************************************/

$(document).ready(function(){
	$("a[@href^='http']").attr('target','_blank');

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
	loading = new loading();
	
	loading.init();
	
	loading.displayMessage("Preloading Images");
	var t=setTimeout("preload()",3000);
	
	});	

});

function selectFrom(iFirstValue, iLastValue) {
    var iChoices = iLastValue - iFirstValue + 1;
    return Math.floor(Math.random() * iChoices + iFirstValue);
}


function loadedImg(i) {
	if(i == buffer.length) {
		container.init();
	}
}



function preload() {
		
		
		for(var i = 0; i <= bufferLimit; i++) {
		image[i] = new Image();	
	    image[i].onLoad = loadedImg(i);
		image[i].src = buffer[i];
	}		
}

function zoomgrid(direction) {
	grid.zoom(direction)
}


