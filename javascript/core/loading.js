/* Container Object */

function loading() {
	this.displayMessage  = displayMessage;
	this.updateLoadingPosition = updateLoadingPosition;
	
	$("#loading").css("top",stageSize()[1]/2 - 50);
	$("#loading").css("left",stageSize()[0]/2 - 100);
}

// Member Functions  ********************************************************************************************/
	
function updateLoadingPosition() {
	$("#loading").css("top",stageSize()[1]/2 - 50);
	$("#loading").css("left",stageSize()[0]/2 - 100);
}

function displayMessage(message) {
	$("#msg").html(message);
}	
