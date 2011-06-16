/***************************************************** Grid Object *****************************************************/ 
function grid(userbuffer,buffer) {	
		
	 if (typeof(_grid_prototype_called) == 'undefined') {
	     _gridprototype_called = true;
	     grid.prototype.generate = generate;
    	 grid.prototype.zoom = zoom;
    	 grid.prototype.calculateUp = calculateUp;
         grid.prototype.calculateDown = calculateDown;
		 grid.prototype.checkArray = checkArray;
		 grid.prototype.createLookup = createLookup;
		 grid.prototype.populate = populate;
	}
	
	
	/************************* Creation and Populating **************************/
	
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
		
	function generate(userbuffer,buffer) {

		$.each(buffer, function(i, l){
		if( i == buffer.length -1) {
			//console.debug();
			createLookup();
		} else { 
			if(highlightbuffer[i] == 1) {
				covers[i] = new coverSingle(i,l);
									
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
				covers[i].resize(i,initialSize * 2);
										
			}
		}	
		});
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
					
					smallcovers[i] = new coverSingle(i,l);										
					tilePosX = whiteListCol[wListPosition] * (initialSize + gap);
					tilePosY = whiteListRow[wListPosition] * (initialSize + gap);
					smallcovers[i].updatePosition(i,tilePosX,tilePosY);
					smallcovers[i].resize(i,initialSize);
					wListPosition++;
				} 
			} else { 
				console.debug("reached end of whitelist. it is only ", whiteListCol.length, wListPosition); 
				
			}
		});	
		
	}
	
	/************************* Zoom In/Out **************************/
	
	
	function calculateUp(number){
		return Math.round((number + 0.1)*100)/100;
	}
	
	function calculateDown(number){
		return Math.round((number - 0.1)*100)/100;
	}
	
	function zoom(direction) {
		if(direction == 0) {
			// limit minZoom
			if(zoomCover == minZoom) {
				// reached limit
			} else {
				zoomCover = calculateDown(zoomCover);
				$.each(buffer, function(i, l){
					if(smallcovers[i] != undefined ) {
						smallcovers[i].resize(i, initialSize * zoomCover);
						smallcovers[i].updateBasedonCurrent(i,zoomCover,direction);
					}
					if(covers[i] != undefined ) {
						covers[i].resize(i, initialSize * zoomCover * 2);
						covers[i].updateBasedonCurrent(i,zoomCover,direction);
					}						
				});
				updatedLinkSize = updatedLinkSize - 2;
				updatedFontSize = updatedFontSize - 1;				
			}
		} else if(direction == 1) {
			// limit maxZoom		
			if(zoomCover == maxZoom) {
				// reached limit
			} else {				
				zoomCover = calculateUp(zoomCover);
				$.each(buffer, function(i, l){
					if(smallcovers[i] != undefined ) {
						smallcovers[i].resize(i, initialSize * zoomCover);
						smallcovers[i].updateBasedonCurrent(i,zoomCover,direction);
					}
					if(covers[i] != undefined ) {
						covers[i].resize(i, initialSize * zoomCover * 2);
						covers[i].updateBasedonCurrent(i,zoomCover,direction);
					}						
				});				
				updatedLinkSize = updatedLinkSize + 2;
				updatedFontSize = updatedFontSize + 1;
			}
		}
		// update container dimensions
		$("#container").css("width",containerSize * zoomCover);
		$("#container").css("height",containerSize  * zoomCover);		
		$("#container").css("left", stageSize()[0]/2 - (containerSize * zoomCover)/2);
		$("#container").css("top", stageSize()[1]/2 - (containerSize * zoomCover)/2);
		
		// update text dimensions and padding
		$(".cover a").css("font-size", updatedLinkSize + "px");
		$(".cover").css("font-size", updatedFontSize + "px");
	}		
} // end of grid object