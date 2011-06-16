/***************************************************** Cover Object  **************************************/

function coverSingle(i,l) {
	
	  if (typeof(_coverSingle_prototype_called) == 'undefined')	  {
	     _coverSingle_prototype_called = true;
	     coverSingle.prototype.updatePosition = updatePosition;
		 //coverSingle.prototype.tweenToPosition = tweenToPosition;
	     coverSingle.prototype.resize = resize;
		 coverSingle.prototype.updateBasedonCurrent = updateBasedonCurrent;
		 coverSingle.prototype.sidechange = sidechange;
	  }
	
	   $(document.createElement("div")).attr("id","cover_"+i).appendTo("#container").addClass("cover"); 												     //  creates 2 "#cover0_0"
	   $(document.createElement("div")).attr("id","coverfront_"+i).appendTo("#cover_"+i).addClass("front");													 //  creates 3 "#coverfront0_0" front
	   $(document.createElement("div")).attr("id","coverback_"+i).appendTo("#cover_"+i).addClass("back"); 													 // creates 4 "#coverback0_0"	back
	   $(document.createElement("img")).attr({ src: l }).attr("id","img_"+i).appendTo("#coverfront_"+i);  // image element
	   
	   //$("#coverback_"+i).css("width", initialSize);
       //$("#coverback_"+i).css("height", initialSize);
		$("#coverback_"+i).css("display","none");
	    $("#coverback_"+i).html('<div class="backcontent">Created By:<br><a href="http://www.kaiserchiefs.com/'+userbuffer[i]+'">'+userbuffer[i]+'</a></div>');
	
		$("#cover_"+i).hoverIntent(
			function () {

				$(this).find('div').stop().rotate3Di('flip', 300, {direction: 'clockwise', sideChange: sidechange});
			},
			function () {
				$(this).find('div').stop().rotate3Di('unflip', 300, {sideChange: sidechange}
			);
		});

	function updatePosition(i,x,y) {
		$("#cover_"+i).css("top",y);
		$("#cover_"+i).css("left",x);		
	 }	
	
	function updateBasedonCurrent(i,zoomCover,direction) {
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