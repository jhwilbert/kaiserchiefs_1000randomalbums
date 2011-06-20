/***************************************************** Settings ***************************************/

/* Local Settings */
var feedUrl = 'http://localhost:8181/display'; // path to JSON service
var bufferUrl = 'http://localhost:8181/bufferCount'; // path to the buffer counter

/* Remote Settings */
//var feedUrl = 'http://kaiserchiefsalbums.appspot.com/display'; // path to JSON service
//var bufferUrl = 'http://kaiserchiefsalbums.appspot.com/bufferCount'; // path to the buffer counter

/* Buffering */
var bufferLimit = 300; // how many images are loaded from JSON uncomment next line to load all
//var bufferLimit;

/* Layout */
var initialSize = 200; // size (w x h) of each cover
var gap = 4; // gap between images

/***************************************************************************************************/
