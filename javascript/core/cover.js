/* coverSingle Object */

function coverSingle() {
	this.initCover = initCover;
    this.updatePosition = updatePosition;
    this.resize = resize;
	this.sidechange = sidechange;
	this.rotated = rotated;
	this.enableClick = enableClick;
}

// Member Functions  ********************************************************************************************/	
	  
function initCover(i,l) {
  // create elements based on index as id (#cover_id)
   $(document.createElement("div")).attr("id","cover_"+i).appendTo("#container").addClass("cover");
   $(document.createElement("div")).attr("id","coverfront_"+i).appendTo("#cover_"+i).addClass("front");
   $(document.createElement("div")).attr("id","coverback_"+i).appendTo("#cover_"+i).addClass("back").css("display","none");
   $(document.createElement("img")).attr({ src: l }).attr("id","img_"+i).appendTo("#coverfront_"+i);

   var username = userbuffer[i].toUpperCase();
    // insert back content
   $("#coverback_"+i).html('<div class="backcontent"><a href="http://www.kaiserchiefs.com/'+userbuffer[i]+'" target="_blank">'+ username+'\'s<br>ALBUM</a></div>');

   // attach rollover event
   $("#cover_"+i).hoverIntent(function () {
		$(this).find('div').stop().rotate3Di('flip', 300, {direction: 'clockwise', sideChange: sidechange, complete: rotated(i) });},function () {
           $(this).find('div').stop().rotate3Di('unflip', 300, {sideChange: sidechange});
   });

}

function updatePosition(i,x,y) {
	$("#cover_"+i).css("top",y);
	$("#cover_"+i).css("left",x);
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
	//s = setTimeout("enableClick("+i+")",600);
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

function enableClick(i) {
	//clearInterval(s)
	//$("#cover_"+i).click(function() { window.open("http://www.kaiserchiefs.com/"+userbuffer[i]);})
}