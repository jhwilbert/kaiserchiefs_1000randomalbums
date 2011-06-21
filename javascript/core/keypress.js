/*
keyinit();

function keyinit()
{
    if (document.addEventListener)
    {
       document.addEventListener("keydown",keydown,false);
       document.addEventListener("keypress",keydown,false);
       document.addEventListener("keyup",keydown,false);
    }
    else if (document.attachEvent)
    {
       document.attachEvent("onkeydown", keydown);
       document.attachEvent("onkeypress", keydown);
       document.attachEvent("onkeyup", keydown);

    }
    else
    {
       document.onkeydown= keydown;
       document.onkeypress= keydown;
       document.onkeyup= keydown;
	}
}


function keydown(e) {
	if (!e) e= event;
	
	console.debug(e);
	
	var mover = $("#container");
	var moverPos = mover.position();
	var left = moverPos.left;
	var top = moverPos.top;

	
	var addTop = function(diff) {
        //$mover.css("top", ($mover.position().top + diff) + "px"); 
		top += diff;
 		$("#container").css("top", top + "px");
	}

	var addLeft = function(diff) {
        //$mover.css("left", ($mover.position().left + diff) + "px");
        //if using tracked position:
		left += diff;
		$("#container").css("left", left + "px");
    }


	switch(e.keyCode) {
		case 37: //left
			addLeft(-1); break; 
		case 38: //up
			addTop(-1); break;
		case 39: //right
			addLeft(1); break;
		case 40: //down
			addTop(1); break;
	}
}
*/
