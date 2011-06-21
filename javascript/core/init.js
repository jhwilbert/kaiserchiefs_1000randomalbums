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
	loading = new loading();
	loading.displayMessage("Loading 1000 Random Albums");
	
	s=setTimeout("getJSON()",1000);	
	$("a[@href^='http']").attr('target','_blank');	
});

function getJSON() {
	$.getJSON(feedUrl, function(data) {	
		$.each(data, function(key, val) {
			if(buffer.length >= bufferLimit) {	
				// don't add anymore
			} else {
				buffer.push(val.path)
				userbuffer.push(val.username)
				highlightbuffer.push(val.highlight)
				
			}
		});
	});
	s=setTimeout("preload()",3000);
}

function preload() {	
	clearTimeout(s);
	var async = 100 ;
	
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