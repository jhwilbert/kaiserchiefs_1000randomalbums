/* grid Object */

function grid() {	
	
	this.checkArray = checkArray;
	this.createLookup = createLookup;
	this.populate = populate;
	this.updateclasses = updateclasses;
	this.display = display;
	
	
	$.each(buffer, function(i, l){
	if( i == buffer.length - 1 ) {
		createLookup();
	} else { 
		if(highlightbuffer[i] == 1) {
			covers[i] = new coverSingle();
			covers[i].initCover(i,l);
							
			randRow =  Math.floor(Math.random() * (totalColumns - 1));
			randCol=  Math.floor(Math.random() * (totalColumns - 1));

			while (checkArray(randRow,randCol) == true || checkArray(randRow,randCol+1) == true || checkArray(randRow+1,randCol) == true || checkArray(randRow+1,randCol+1) == true) {

			randRow =  Math.floor(Math.random() * (totalColumns - 1));
			randCol =  Math.floor(Math.random() * (totalColumns - 1));
			} 
			
			// position them and blacklist
			tilePosX = randCol * (initialSize + gap);
			tilePosY = randRow * (initialSize + gap);
							
			blackListRow.push(randRow,randRow,randRow+1,randRow+1);
			blackListCol.push(randCol,randCol+1,randCol,randCol+1);	
			
			covers[i].updatePosition(i,tilePosX,tilePosY);
			covers[i].resize(i,initialSize * 2 + gap);
		}
	}	
	});
}

// Member Functions  ********************************************************************************************/
	

function checkArray(row,column) {		
	if ( blackListRow.length > 0 ) {
		for(var i=0; i < blackListRow.length; i++) {
			if(blackListRow[i] == row && blackListCol[i] == column ) {
				return true;
			}
			if (i == (blackListRow.length -1) ) return false;
		}
	} else {
		return false;
	}
}
	
function createLookup() {
	$.each(buffer, function(i, l){
		// go through each x,y
		row = Math.floor(i/totalColumns);	
		column = i % totalColumns;
		//console.debug("x,y:", column, row);
		if(checkArray(row,column) == true) {

		} else {
			whiteListCol.push(column);
			whiteListRow.push(row);
		}			
	});
	populate(); // populate grid with small ones
}

function populate() {	
	wListPosition = 0;	
	// go through each in buffer
	$.each(buffer, function(i, l){		
		if(wListPosition < whiteListCol.length) {
			// Only for ones that aren't highlighted
			if(highlightbuffer[i] == 0) {
				
				smallcovers[i] = new coverSingle();
				smallcovers[i].initCover(i,l);
										
				tilePosX = whiteListCol[wListPosition] * (initialSize + gap);
				tilePosY = whiteListRow[wListPosition] * (initialSize + gap);
				smallcovers[i].updatePosition(i,tilePosX,tilePosY);
				smallcovers[i].resize(i,initialSize);
				wListPosition++;
			} 
		} else { 
			//console.debug("reached end of whitelist. it is only ", whiteListCol.length, wListPosition); 
		}
	});	
	var l=setTimeout("display()",3000);
	updateclasses();
	
	// clean buffer
	buffer = [];
	
}
	
function updateclasses() {
	$(".backcontent").css("padding-top", ((initialSize/2) - 15)* zoomCover + "px");
	
}		

function display() {    
    //$("#container").fadeIn("slow");
    $("#container").css("display","block");
	$("#loading").html("");

}