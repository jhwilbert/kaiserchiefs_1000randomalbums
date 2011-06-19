/* Container Object */

function loading() {
	  // Object Constructor ********************************************************************************************/
	
	  // declare member functions
	  if (typeof(_loading_prototype_called) == 'undefined') {
	     _loading_prototype_called = true;
		 loading.prototype.init = init;
		 loading.prototype.displayMessage = displayMessage;

	  }
	// Member Functions  ********************************************************************************************/
	
	function init() {
		//console.debug("init loading")
		
		$("#loading").css("top",stageSize()[1]/2 - 50);
		$("#loading").css("left",stageSize()[0]/2 - 100);
	}
	
	function displayMessage(message) {
		$("#msg").html(message);
	}	
}