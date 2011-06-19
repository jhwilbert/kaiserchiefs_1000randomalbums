/* coverSingle Object */

function coverSingle() {
	  
	  // Object Constructor ********************************************************************************************/
	
	  // declare member functions
	  if (typeof(_coverSingle_prototype_called) == 'undefined') {
	     _coverSingle_prototype_called = true;
		 coverSingle.prototype.init = init;
	     coverSingle.prototype.updatePosition = updatePosition;
	     coverSingle.prototype.resize = resize;
		 coverSingle.prototype.updateZoomPosition = updateZoomPosition;
		 coverSingle.prototype.sidechange = sidechange;
		 coverSingle.prototype.rotated = rotated;
		 coverSingle.prototype.enableClick = rotated;
	  }
	  
	function init(i,l) {
	  // create elements based on index as id (#cover_id)
	   $(document.createElement("div")).attr("id","cover_"+i).appendTo("#container").addClass("cover");
	   $(document.createElement("div")).attr("id","coverfront_"+i).appendTo("#cover_"+i).addClass("front");
	   $(document.createElement("div")).attr("id","coverback_"+i).appendTo("#cover_"+i).addClass("back").css("display","none");
	   $(document.createElement("img")).attr({ src: l }).attr("id","img_"+i).appendTo("#coverfront_"+i);
	
	   var username = userbuffer[i].toUpperCase();
	    // insert back content
	   $("#coverback_"+i).html('<div class="backcontent">'+ username+'\'s<br>ALBUM</div>');

	   // attach rollover event
	   $("#cover_"+i).hoverIntent(function () {
			$(this).find('div').stop().rotate3Di('flip', 300, {direction: 'clockwise', sideChange: sidechange, complete: rotated(i) });},function () {
            $(this).find('div').stop().rotate3Di('unflip', 300, {sideChange: sidechange});
	   });
	
	}


	// Member Functions  ********************************************************************************************/
	
	function updatePosition(i,x,y) {
		$("#cover_"+i).css("top",y);
		$("#cover_"+i).css("left",x);
	 }		
	
	
	function updateZoomPosition(i,zoomCover,direction) {
		var p = $("#cover_"+i);
		var position = p.position();
		currx = position.left;
		curry = position.top;
			
		if(direction == 0) {
			ratioPosX = currx / (initialSize * totalColumns * (zoomCover + 0.1));
			ratioPosY = curry / (initialSize * totalColumns * (zoomCover + 0.1));
			finalx = ratioPosX * initialSize * totalColumns * zoomCover;
			finaly = ratioPosY * initialSize * totalColumns * zoomCover;
			$("#cover_"+i).css("top",finaly);
			$("#cover_"+i).css("left",finalx);
			

		} else if(direction == 1) {
			ratioPosX = currx / (initialSize * totalColumns * (zoomCover - 0.1));
			ratioPosY = curry / (initialSize * totalColumns * (zoomCover - 0.1));
			finalx = ratioPosX * initialSize * totalColumns * zoomCover;
			finaly = ratioPosY * initialSize * totalColumns * zoomCover;
			$("#cover_"+i).css("top",finaly);
			$("#cover_"+i).css("left",finalx);
		}
	}
	
	function sidechange(front) {
	    if (front) {
	        $(this).parent().find('div.front').show();
	        $(this).parent().find('div.back').hide();        
	    } else {
	        $(this).parent().find('div.front').hide();
	        $(this).parent().find('div.back').show();
	    }
	}

	
	function rotated(i) {
		s = setTimeout("enableClick("+i+")",400);
	}
	
	function resize(i,initialSize){
		
		$("#img_"+i).css("width",initialSize);
		$("#img_"+i).css("height",initialSize);
		
		$("#cover_"+i).css("width",initialSize);
		$("#cover_"+i).css("height",initialSize);
		
		$("#coverfront_"+i).css("width",initialSize);
		$("#coverfront_"+i).css("height",initialSize);
		
		$("#coverback_"+i).css("width",initialSize);
		$("#coverback_"+i).css("height",initialSize);
	}
} // end of cover object

function enableClick(i) {
	clearInterval(s)
	$("#cover_"+i).click(function() { window.open("http://www.kaiserchiefs.com/"+userbuffer[i]);})
}