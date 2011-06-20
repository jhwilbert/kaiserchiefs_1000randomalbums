/* Container Object */

function loading() {
	this.displayMessage  = displayMessage;
	
	$("#loading").css("top",stageSize()[1]/2 - 50);
	$("#loading").css("left",stageSize()[0]/2 - 100);
}

// Member Functions  ********************************************************************************************/
	

function displayMessage(message) {
	$("#msg").html(message);
}	
