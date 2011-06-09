/***************************************************** Declararations ***************************************/

// Settings
var feedUrl = 'http://localhost:8080/json'; // path to JSON service

var bufferLimit = 24; // how many images are loaded from JSON
var initialSize = 200; // size (w x h) of each cover
var frameRate =  1000/30; // mouseover framerate
var rotationRate = 10000;
var gap = 50;
// General Variables
var l = 0;
var buffer = [];
var userbuffer = [];
var	stacks = [];

var tweenLeft = [];
var tweenTop = [];


var totalColumns;
var totalCovers;
var tileTotal;

// Cover Arrays
covers = [];

var posX;
var posY;

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
		    // stop adding
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
		singleStack1 = new coverStack(userbuffer,buffer,0); // takes user names, image paths and stack index - starting at 0

		timedRotation();
	});


	
});


/***************************************************** Tweening Functions ***************************************/
var parallel;  
var sequence;

function mySideChange(front) {
    if (front) {
        $(this).parent().find('div.front').show();
        $(this).parent().find('div.back').hide();
        
    } else {
        $(this).parent().find('div.front').hide();
        $(this).parent().find('div.back').show();
    }
}


function switchView(position) {
	
	parallel = new Parallel();
	sequence = new Sequence();
	
	totalColumns = 	Math.floor(stageSize()[0]/initialSize) - 2;
	
	for (i=0; i< bufferLimit; i++) 	{
		
		if(position==1) {
			
			
			
			// tile elements
			row = Math.floor(i/totalColumns);	
			column = i % totalColumns;

			tilePosX = ((initialSize + gap) * column);
			tilePosY = ((initialSize + gap) * row);
			covers[i].tweenToPosition(i,tilePosX,tilePosY);
			
			// start drag
			//Drag.init(document.getElementById("container"));
			
			//$("#container").css("cursor","pointer");

			$("#cover"+divindex +"_"+i).hover(				
			        function () {
			            $(this).find('div').stop().rotate3Di('flip', 250, {direction: 'clockwise', sideChange: mySideChange});
			        },
			        function () {
			            $(this).find('div').stop().rotate3Di('unflip', 500, {sideChange: mySideChange});
			        }
			    );
			
		} else {
			covers[i].tweenToPosition(i,stageCenter()[0],stageCenter()[1]);

		}
	}
	parallel.start();
	//sequence.start()

}



/***************************************************** Cover Stack Object **************************************/





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
	   $(document.createElement("div")).attr("id","coverfront"+divindex +"_"+i).appendTo("#cover"+divindex +"_"+i).addClass("front"); //  creates 3 "#coverfront0_0" front
	   $(document.createElement("div")).attr("id","coverback"+divindex +"_"+i).appendTo("#cover"+divindex +"_"+i).addClass("back"); // creates 4 "#coverback0_0"	
	
	   $(document.createElement("img")).attr({ src: l }).appendTo("#coverfront"+divindex +"_"+i).css("width",initialSize).css("height",initialSize); // create image element for front
	   $("#coverback"+divindex +"_"+i).html("test back");
	
	   $("#coverback"+divindex +"_"+i).css("width", initialSize);
       $("#coverback"+divindex +"_"+i).css("height", initialSize);
		
	   $("#coverback"+divindex +"_"+i).html('<div class="backcontent"><a href="http://www.kaiserchiefs.com/'+userbuffer[i]+'">'+userbuffer[i]+'</a></div>');


	  if (typeof(_coverSingle_prototype_called) == 'undefined')	  {
	     _coverSingle_prototype_called = true;
	     coverSingle.prototype.updatePosition = updatePosition;
		 coverSingle.prototype.tweenToPosition = tweenToPosition;
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
					
		//console.debug("cover"+divindex +"_"+i,"starty"+curry,"startx" +currx)
		parallel.addChild(new Tween(document.getElementById("cover"+divindex +"_"+i).style,'left',Tween.regularEaseOut,currx,endx,2,'px'));
		parallel.addChild(new Tween(document.getElementById("cover"+divindex +"_"+i).style,'top',Tween.regularEaseOut,curry,endy,2,'px'));
				
		//sequence.addChild(new Tween(document.getElementById("cover"+divindex +"_"+i).style,'left',Tween.regularEaseOut,currx,endx,0.1,'px'));
		//sequence.addChild(new Tween(document.getElementById("cover"+divindex +"_"+i).style,'top',Tween.regularEaseOut,curry,endy,0.1,'px'));

	 }

	
}



// coverStack object
function coverStack(userbuffer,buffer,divindex) {
	
	// create indexed stack div
	$("#container").append('<div class="floatStack" id="coverStack'+divindex+'"></div>');
	//$("#coverStackContainer"+divindex).append('<div class="floatStack" id="userStack'+divindex+'"></div>');	
	//$("#coverStackContainer"+divindex).append('<div class="floatStack" id="coverStack'+divindex+'" onMouseOver="handleOver('+divindex+')" onMouseOut="handleOut('+divindex+')"></div>');
	
	// hide it during loading
	//$("#coverStack"+divindex).css("display", "none");
			
	// append image and create stcack
	$.each(buffer, function(i, l){
		  covers[i] = new coverSingle(divindex,i,l);
		  covers[i].updatePosition(divindex,i,stageCenter()[0],stageCenter()[1]);
		
	});

	// fade in if loaded
	if(allImagesLoaded() == 1) {
		//$("#coverStack"+divindex).css("display", "block");
		$(".floatStack").fadeIn('slow', function() {
	     // alert("Animation complete");
	    });
	}
}


function allImagesLoaded() {
	var imagesloaded = 1;
	var img = document.images;

	for (var i = 0;i<img.length;i++) {
		// If the image isnt loaded we set the return varible to 0
		if(img[i].complete == false) {
			imagesloaded = 0;
		}
	}
	return imagesloaded;
}



/***************************************************** Timmers  ***************************************/

function changeIndex() {	
	
	l = l+1;
	
	divindex = 0;
	
	$("#cover"+divindex +"_"+ (bufferLimit - (l-1)) ).css({'z-index' : '0' });
	$("#cover"+divindex +"_"+ (bufferLimit - (l)) ).css({'z-index' : '1'  });
	
	
	$("#user"+divindex +"_"+ (bufferLimit - (l-1)) ).css({'display' : 'none' });
	$("#user"+divindex +"_"+ (bufferLimit - (l)) ).css({'display' : 'block' });
	
	
	if( l == bufferLimit) {
		var randomnumber=Math.floor(Math.random()*bufferLimit);
		l = randomnumber;
	}
	
}


// Rotation Timmer
function timedRotation() {
	v=v+1;
	r = setTimeout("timedRotation()",rotationRate);
	timedCount(0);
}

// Swap Timmer
function timedCount() {	
	if(c == bufferLimit) {
	   c = 0;
	} else {
		c = c+1;
		t = setTimeout("timedCount()",frameRate);
		changeIndex();
	}	
}



function handleOver() {
}

function handleOut() {
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

/*
window.onresize=function(){

}

*/