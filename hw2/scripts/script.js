/* Script for my Splash page (index.html) */


// borrowed without permission from StackOverflow (http://stackoverflow.com/questions/2173229/how-do-i-write-a-rgb-color-value-in-javascript)
function RGB2HTML(red, green, blue)
{
    var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
    return '#'+decColor.toString(16).substr(1);
}
// Using window.onload as given in the example
window.onload = function() {

   // Make all the links pink on index.html first
   var links = document.getElementsByTagName("a");   // An array
   
   for (var i=0; i<links.length; i++) {
   		links[i].style.color = "pink";
   		//console.log(links[i].style); // for my viewing pleasure... (and becaues the links are kind of hard to see on the gray background)
   }


   /* Assignment: Using javascript, make each paragraph colored a successively darker shade of grey,
   		with the first one being white and the last one being black. */

   	var paras = document.getElementsByTagName("p");
   	var len = paras.length
   	var c = 0;
   	for (var i=0; i<len; i++) {
   		c = 255.0*(1 - (i/(len-1)));
   		console.log(c)
   		paras[i].style.color = RGB2HTML(c, c, c);	
   	}

   	// Use getElementById to select one element on the page and make it disappear.
   	document.getElementById("bib").style.visibility = "hidden";

};