$(document).bind('keydown', 'down', moveDown);
$(document).bind('keydown', 'right', moveRight);

$(document).bind('keydown', 'left', moveLeft);
//$(document).bind('keydown', 'up', moveUp);



var moverPos;
var topPos;
var leftPos;

function moveDown() {
	moverPos = $("#container").position();
	topPos = moverPos.top	
	if(topPos >= 0) {
		$("#container").css("top",0 + "px");
	} else {
		topPos += 20;
 		$("#container").css("top",topPos + "px");
	}
}

/* right & left */

function moveRight() {
	moverPos = $("#container").position();
	leftPos = moverPos.left	
	if(leftPos >= 0) {
		$("#container").css("left",0 + "px");
	} else {
		leftPos += 20;
 		$("#container").css("left", leftPos + "px");
	}
}

function moveLeft() {
	moverPos = $("#container").position();
	leftPos = moverPos.left	
	
	//if(leftPos >= -3360) {
	//	$("#container").css("left",-3360 + "px");
	//} else {
		leftPos -= 20;
 		$("#container").css("left", leftPos + "px");
 		console.debug(leftPos);
	//}
}
