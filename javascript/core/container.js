/* Container Object */

function container() {

	// Object Constructor ********************************************************************************************/
	
	
	 if (typeof(_container_prototype_called) == 'undefined') {
	     _containerprototype_called = true;
		container.prototype.updateDimensions = updateDimensions;
		container.prototype.init = init;
		//container.prototype.fadeIn = fadeIn;	
	}
	
	function init() {
		totalColumns = Math.floor(bufferLimit/Math.sqrt(bufferLimit));
		containerSize = totalColumns*(initialSize + gap);
		containerCenter = containerSize/2;

		$("#container").css("left", (stageSize()[0]/2) - (containerCenter));
		$("#container").css("top", (stageSize()[1]/2) - (containerCenter));

		// drag
		var theRoot = document.getElementById("container");
		Drag.init(theRoot, null);

		$("#container").css("width",containerSize);
		$("#container").css("height",containerSize);
			
				
	}
	
	// Member Functions  ********************************************************************************************/
	
	function updateDimensions(){
		// update container dimensions
		$("#container").css("width",containerSize * zoomCover);
		$("#container").css("height",containerSize  * zoomCover);		
		$("#container").css("left", stageSize()[0]/2 - (containerSize * zoomCover)/2);
		$("#container").css("top", stageSize()[1]/2 - (containerSize * zoomCover)/2);
	
		// update text dimensions and padding
		$(".cover a").css("font-size", updatedLinkSize + "px");
		$(".cover").css("font-size", updatedFontSize + "px");
	}
}