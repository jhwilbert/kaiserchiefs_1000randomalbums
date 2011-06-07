// Preload Images

if (document.images) {
  preload_image_object = new Image();
  // set image url
  image_url = new Array();
  image_url[0] = "http://mydomain.com/image0.gif";
  image_url[1] = "http://mydomain.com/image1.gif";
  image_url[2] = "http://mydomain.com/image2.gif";
  image_url[3] = "http://mydomain.com/image3.gif";

   var i = 0;
   for(i=0; i<=3; i++) 
   preload_image_object.src = image_url[i];
}



// Initialize Variables
var loadLimit = 4000;
var feedUrl = 'http://localhost:8080/json';
var size = 100;

var items = [];
var buffer = [];


var c=0;
var t;
var timer_is_on=0;


function preloader()  {
heavyImage = new Image(); 
heavyImage.src = "heavyimagefile.jpg";
}

// Initialize jQuery
$(document).ready(function(){
	
	$.getJSON(feedUrl, function(data) {

	  
	  $.each(data, function(key, val) {
	
		if (items.length == loadLimit) {
		    buffer.push('<a href="http://www.kaiserchiefs.com/'+val.username+'"><div id="unique" class="cover" onMouseOver="handleOver(this)" onMouseOut="handleOut(this)"> <img src="'+val.path+'" width="'+size+'" height="'+size+'" border="0"></div></div>');
		} else {
		    items.push('<a href="http://www.kaiserchiefs.com/'+val.username+'"><div id="unique" class="cover" onMouseOver="handleOver(this)" onMouseOut="handleOut(this)"> <img src="'+val.path+'" width="'+size+'" height="'+size+'" border="0"></div></div>');	
		}
		
	  });
	
	  //console.debug(items.length);
	  //console.debug(buffer.length);
	  $('<ul/>', { 'class': 'albumList',html: items.join('')}).appendTo('body');
	  // initiate swap
	  
	});
	//doTimer();
});

// Additional Functions


function timedCount() {

	c=c+1;
	t=setTimeout("timedCount()",70);
	console.debug(c);
	swapCover();
}

function doTimer() {
	if (!timer_is_on) {
  		timer_is_on=1;
  		timedCount();
  	}
}

function swapCover() {


	//console.debug(buffer[c]);
	//counter++;
	console.debug("test");
	//$('#unique').html(buffer[c]);
	//console.debug("removed" + '#'+items[randomcover]);
}

function handleOver(id) {	

	console.debug(id);
}

function handleOut(id) {
	clearTimeout(t);
	timer_is_on=0;
//	console.debug(id);
}
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
	
	return resolution;

}

