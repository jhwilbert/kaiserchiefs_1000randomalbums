/* Container Object */
var containerSize;


function container() {
	loading.displayMessage("click and drag to move around");
	
	$('body').append('<div id="container"></div>');
	
	// member functions
	this.updateDimensions = updateDimensions;

	totalColumns = Math.floor(bufferLimit/Math.sqrt(bufferLimit));
	containerSize = totalColumns*(initialSize + gap);
	containerCenter = containerSize/2;

	startPointX = (stageSize()[0]/2) - (containerCenter);
	startPointY = (stageSize()[0]/2) - (containerCenter);
	
	
	//$("#container").css("left", startPointX);
	//$("#container").css("top", startPointY);

	var theRoot = document.getElementById("container");
	
	$("#container").css("width",containerSize);
	$("#container").css("height",containerSize);
		
	Drag.init(theRoot, null,0-(containerSize-stageSize()[0]),0,0-(containerSize-stageSize()[1]),0);
	
	var containerA = document.getElementById("container");
	theRoot.onDrag = function(x, y) {// x, y contains current offset coords of drag
		
	}
	
	grid = new grid();
	
}


// Member Functions  ********************************************************************************************/

function updateDimensions() {
	// update container dimensions
	$("#container").css("width",containerSize * zoomCover);
	$("#container").css("height",containerSize  * zoomCover);		
	$("#container").css("left", stageSize()[0]/2 - (containerSize * zoomCover)/2);
	$("#container").css("top", stageSize()[1]/2 - (containerSize * zoomCover)/2);

	// update text dimensions and padding
	$(".cover a").css("font-size", updatedLinkSize + "px");
	$(".cover").css("font-size", updatedFontSize + "px");
}


