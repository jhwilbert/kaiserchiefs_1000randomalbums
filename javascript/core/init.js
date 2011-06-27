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
shuffledarr = [];
randomKeys = [];
finalArray = []
cutArray = [];
highlgihtedones = [];
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
var fontSize = 12;
var linkSize = 20;
var row;
var column;
var randRow;
var randCol;

// Timers
var c=0;
var t;
var timer_is_on=0;
var s;

	
/***************************************************** Jquery Init Stuff ***************************************/

$(document).ready(function(){

	// start loading message
	loading = new loading();
	loading.displayMessage("Loading 1000 Random Albums<br>click and drag to move around");
	
	s=setTimeout("getJSON()",1000);
	
});

function getHighlighted() {

}
function getJSON() {
	
	// first get the highlighted ones and push them
	$.getJSON(highlightedUrl, function(datah) {		
		$.each(datah, function(keyh, valh) {
			buffer.push(valh.path)
			userbuffer.push(valh.username)
			highlightbuffer.push(valh.highlight)	
		});
	});
	
	// get all others
	$.getJSON(feedUrl, function(data) {
		$.each(data, function(key, val) {
	    	randomKeys.push(key);			
	});

	shuffledarr = shuffle(randomKeys)
	// remove all others according to how many highlighted are there
	cutArray = shuffledarr.splice(0,bufferLimit - buffer.length);
	
	// push to final array
	for (var a = 0; a < cutArray.length; a++) {
		buffer.push(data[cutArray[a]].path)
		userbuffer.push(data[cutArray[a]].username)
		highlightbuffer.push(data[cutArray[a]].highlight)
	}
		
		container = new container();
	});
}



function shuffle(o){
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

/*
function preload() {	
	clearTimeout(s);
	var async = 200 ;
	
	$({}).imageLoader({
		images: buffer,
		async: async,
		complete: function(e, ui) {
			//console.debug(e,ui);
			loading.displayMessage("Loading 1000 Random Albums");
		},
		allcomplete: function(e, ui) {
			container = new container();
		}
	});	
}
*/