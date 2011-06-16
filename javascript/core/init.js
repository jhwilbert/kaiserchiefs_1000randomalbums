/***************************************************** Settings ***************************************/

var feedUrl = 'http://localhost:8181/display'; // path to JSON service
var bufferLimit = 900; // how many images are loaded from JSON
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

var start = getUrlVars()["start"];
var end = getUrlVars()["end"];

/***************************************************** Jquery Init Stuff ***************************************/

$(document).ready(function(){
	getUrlVars();
			
	$.getJSON(feedUrl, function(data) {

	  $.each(data, function(key, val) {
		
		var index = selectFrom(0, aColors.length-1);
		var sColor = aColors[index];
		console.log(sColor);
		
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

	
	container = new container();
    grid = new grid();
	preload();
	
	//console.debug("initial userbuffer", userbuffer, "length", userbuffer.length);
	//console.debug("initial offset", useroffset, "length", useroffset.length);

	});	

});

function selectFrom(iFirstValue, iLastValue) {
    var iChoices = iLastValue - iFirstValue + 1;
    return Math.floor(Math.random() * iChoices + iFirstValue);
}

function preload() {		
	$("#container").html("");   
	// preload images
	if (document.images) {
		preload_image_object = new Image();
		var i = 0;
	
		for(i=0; i<=bufferLimit; i++) 
	   		preload_image_object.src = buffer[i];
		}
		
	// create container object
	container.init();
	grid.init();

}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}


console.debug(end)
/*
function refresh() {
	//resetArrays();
	
	if(offset < bufferLimit) {
		console.debug("no more to load"); 
	} else {
		console.debug("buffer era",userbuffer,"offset era", useroffset);
		// paths
		buffer = offset.slice(0,bufferLimit);
		offset.splice(0,bufferLimit);		
		// user
		userbuffer = useroffset.slice(0,bufferLimit);
		useroffset.splice(0,bufferLimit);
		// highlight
		highlightbuffer = highlightoffset.slice(0,bufferLimit);
		highlightoffset.splice(0,bufferLimit);		

		preload();

}	}	
*/	

	

function zoomgrid(direction) {
	grid.zoom(direction)
}


