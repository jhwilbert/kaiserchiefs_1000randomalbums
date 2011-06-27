$("#container").keydown(function(event) { 
    var $mover = $("#container");
    //if nothing else will move "mover", then track the 
    //position instead of recalculating it every time:
      var moverPos = $mover.position();
      var left = moverPos.left;
      var top = moverPos.top;

    var addTop = function(diff) {
        //$mover.css("top", ($mover.position().top + diff) + "px"); 
        //if using tracked position:
           top += diff;
           $mover.css("top", top) + "px");
    };

    var addLeft = function(diff) {
        //$mover.css("left", ($mover.position().left + diff) + "px");
        //if using tracked position:
           left += diff;

           $mover.css("left", left) + "px");
    };

    switch(event.keyCode) {
        case 37: //left
            addLeft(-1); break; 
        case 38: //up
            addTop(-1); break;
        case 39: //right
            addLeft(1); break;
        case 40: //down
            addTop(1); break;
    }
});
