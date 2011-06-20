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
	loading.updatePosition();
	loading.displayMessage("Loading Feed");
	
	s=setTimeout("getJSON()",1000);
	
	$("a[@href^='http']").attr('target','_blank');
	
});

function getJSON() {
	clearTimeout(s);
	
	// if there's no buffer limit load everything
	if(bufferLimit == undefined) {
		$.getJSON(bufferUrl, function(json) {
			bufferLimit = json.buffer;
		}); 
	}

	$.getJSON(feedUrl, function(data) {
		
	  $.each(data, function(key, val) {
		if(buffer.length >= bufferLimit) {	
			//offset.push(val.path);
			//useroffset.push(val.username);
			//highlightoffset.push(val.highlight);
		} else {
			buffer.push(val.path);
			userbuffer.push(val.username);
			highlightbuffer.push(val.highlight);
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
			loading.displayMessage("Caching Images");
		},
		allcomplete: function(e, ui) {
			container = new container();
		}
	});	
}
